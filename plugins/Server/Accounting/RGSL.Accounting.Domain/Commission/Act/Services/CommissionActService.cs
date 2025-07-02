using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Adacta.AdInsure.Core.Domain.Common;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Domain.Entities.IntegrationService.Interfaces;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.Framework.Core.Sequence;
using Adacta.AdInsure.Framework.Core.Transactions;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Subledger.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.Journal.Interfaces;
using Adacta.AdInsure.RGSL.Common.Domain;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Services
{
    public class CommissionActService : ICommissionActService
    {
        private readonly ICommissionActRepository _commissionActRepository;
        private readonly IIntegrationServiceExecutor _integrationServiceExecutor;
        private readonly IJournalServiceRgsl _journalServiceRgsl;
        private readonly IDimensionsRepository _dimensionsRepository;
        private readonly ICoreSettings _coreSettings;
        private readonly ISequenceGenerator _sequenceGenerator;

        public CommissionActService(
            ICommissionActRepository commissionActRepository,
            IIntegrationServiceExecutor integrationServiceExecutor,
            IJournalServiceRgsl journalServiceRgsl,
            IDimensionsRepository dimensionsRepository,
            ICoreSettings coreSettings,
            ISequenceGenerator sequenceGenerator)
        {
            _commissionActRepository = commissionActRepository;
            _integrationServiceExecutor = integrationServiceExecutor;
            _journalServiceRgsl = journalServiceRgsl;
            _dimensionsRepository = dimensionsRepository;
            _coreSettings = coreSettings;
            _sequenceGenerator = sequenceGenerator;
        }

        [Transaction]
        public long Create(CommissionAct act, bool createAsPaid)
        {
            if (act.ActId.HasValue) throw new InvalidOperationException("act.ActId must be null");
            if (string.IsNullOrEmpty(act.ActNo))
            {
                SetNewActNumber(act);
            }
            act.StateCode = createAsPaid ? CommissionActStatusConst.CompletedPaid : CommissionActStatusConst.Draft;
            act.LastUpdated = DateTime.UtcNow;

            act.VatRate = _commissionActRepository.GetVatRate(act.AgentAgreementNumber, act.IssueDate);
            _commissionActRepository.InsertAct(act);

            return act.ActId.Value;
        }

        [Transaction]
        public void Update(CommissionAct act)
        {
            if (!act.ActId.HasValue) throw new InvalidOperationException("act.ActId is null");

            _commissionActRepository.UpdateAct(act);
        }

        [Transaction]
        public void CreateOrUpdate(CommissionAct act)
        {
            act.LastUpdated = null;
            CommissionAct oldAct = null;
            if (!string.IsNullOrEmpty(act.ActNo))
            {
                oldAct = _commissionActRepository.GetActs(new GetActsRequest { ActNo = act.ActNo }).SingleOrDefault();
            }

            if (oldAct == null)
            {
                Create(act, false);
            }
            else
            {
                act.ActId = oldAct.ActId.Value;
                Update(act);
            }
        }

        [Transaction]
        public async Task SetStatus(long? actId, string actNo, DateTime? lastUpdated, string newState)
        {
            if (!actId.HasValue)
            {
                actId = _commissionActRepository.GetActs(new GetActsRequest { ActNo = actNo }).Single().ActId.Value;
            }

            LockAct(actId.Value, lastUpdated);
            var act = _commissionActRepository.GetActs(new GetActsRequest { ActId = actId }).Single();

            if (newState == CommissionActStatusConst.Deleted)
            {
                _commissionActRepository.UnleashPcFromAct(actId.Value);
            }

            if (newState == CommissionActStatusConst.Annulled)
            {
                _commissionActRepository.CancelActItems(actId.Value, null);
            }

            await OnAfterStatusChanged(act, newState);
        }

        public void LockAct(long actId, DateTime? lastUpdated)
        {
            var storedLastUpdated = _commissionActRepository.LockAct(actId);

            if (lastUpdated.HasValue && lastUpdated.Value != storedLastUpdated)
            {
                throw new BusinessException("The document was changed in parallel session");
            }
        }

        [Transaction]
        public void Clear(long? actId, string actNo, DateTime? lastUpdated)
        {
            if (!actId.HasValue)
            {
                actId = _commissionActRepository.GetActs(new GetActsRequest { ActNo = actNo }).Single().ActId.Value;
            }

            LockAct(actId.Value, lastUpdated);
            _commissionActRepository.DeleteItems(actId.Value, null);
            _commissionActRepository.UpdateActHeader(actId.Value);
        }

        [Transaction]
        public void AnnulItem(long? actId, string actNo, DateTime? lastUpdated, IList<AnnulItemRequestItem> items)
        {
            if (!actId.HasValue)
            {
                actId = _commissionActRepository.GetActs(new GetActsRequest { ActNo = actNo }).Single().ActId.Value;
            }

            LockAct(actId.Value, lastUpdated);
            var act = _commissionActRepository.GetActs(new GetActsRequest { ActId = actId }).Single();
            if (act.StateCode != CommissionActStatusConst.Draft) throw new BusinessException("Only act in status 'Draft' could be modified");

            var contractNumbers = items.Select(_ => _.ContractNumber).ToList();
            var contractItems = _commissionActRepository.GetActItems(actId.Value, null, contractNumbers, false);

            var itemsToAnnul = new List<CommissionActItem>();
            foreach (var contractItem in contractItems)
            {
                bool condition = items.Any(_ => _.ContractNumber == contractItem.ReferenceNo && _.DueDate == contractItem.DueDate);
                if (condition)
                {
                    itemsToAnnul.Add(contractItem);
                }
            }

            var itemIds = itemsToAnnul.Select(_ => _.ActItemId).ToList();
            _commissionActRepository.UpdateItemStatus(actId.Value, CommissionActItemStatusId.Annulled, itemIds);
            _commissionActRepository.CancelActItems(actId.Value, itemIds);
            _commissionActRepository.UpdateActHeader(actId.Value);
        }

        [Transaction]
        public void ChangeItemCommRate(IList<long> actItemIds, DateTime? lastUpdated, decimal? commRateManual, decimal? lcCommAmountManual)
        {
            long actId = _commissionActRepository.GetActId(actItemIds[0]);
            LockAct(actId, lastUpdated);
            var act = _commissionActRepository.GetActs(new GetActsRequest { ActId = actId }).Single();

            var allItems = _commissionActRepository.GetActItems(actId, actItemIds, null, false);

            var groupItems = allItems.GroupBy(_ => new { _.ReferenceNo, _.DueDate, });
            foreach (var group in groupItems)
            {
                var items = group.ToList();

                decimal[] proportions = items.Select(_ => _.PaymentLcAmount.GetValueOrDefault()).ToArray();
                decimal[] amounts = lcCommAmountManual == null ? null : AmountsHelper.GetDistribution(proportions, lcCommAmountManual.Value);
                decimal? groupRate = lcCommAmountManual == null ? null : lcCommAmountManual / items.Sum(_ => _.PaymentLcAmount.GetValueOrDefault());

                for (int i = 0; i < items.Count; ++i)
                {
                    var item = items[i];
                    decimal? rate = commRateManual;
                    decimal? amount = amounts?[i];

                    if (rate == null && amount != null)
                    {
                        rate = groupRate;
                    }

                    if (rate != null && amount == null)
                    {
                        amount = rate * item.PaymentLcAmount.GetValueOrDefault();
                    }

                    decimal commRate = (item.DocCommRate ?? item.AaCommRate).GetValueOrDefault();

                    item.CommRateManual = commRate == rate ? null : rate;
                    item.CommRateFinal = rate ?? commRate;
                    item.LcCommAmountManual = item.LcCommAmountCalc == amount ? null : amount;
                    item.LcCommAmountFinal = (amount ?? item.LcCommAmountCalc) + item.LcCommAmountExtra.GetValueOrDefault();
                }
            }

            ActHelper.CalculateVatAmountsByInstallments(act, allItems);

            foreach (var item in allItems)
            {
                _commissionActRepository.ChangeItemCommRate(item);
            }

            _commissionActRepository.UpdateActHeader(actId);
        }

        [Transaction]
        public void UpdateActHeader(long actId)
        {
            _commissionActRepository.UpdateActHeader(actId);
        }

        [Transaction]
        public void MigrateActHistory(string actNo)
        {
            _commissionActRepository.MigrateActHistory(actNo);
        }
        public void UpdateActItemJson(long itemId, string jsonData)
        {
            _commissionActRepository.UpdateActItemJson(itemId, jsonData);
        }

        private void SetNewActNumber(CommissionAct act)
        {
            string year = DateTime.Now.Year.ToString("D4", CultureInfo.InvariantCulture);
            long newId = _sequenceGenerator.GetNextValues("ACC_IMPL.CA_ACT." + year);
            string number = newId.ToString("D6", CultureInfo.InvariantCulture);
            act.ActNo = $"АВР{year}-{number}";
        }

        private async Task OnAfterStatusChanged(CommissionAct act, string newState)
        {
            Guid businessEventId = Guid.NewGuid();

            if (newState == CommissionActStatusConst.Approved)
            {
                //Transactions:
                var actItems = _commissionActRepository.GetActItems(act.ActId.Value, null, null, true);
                await CreatePostInvoicedCommissionTransaction(act.ActId.Value, businessEventId, -1);
                CreatePostCommissionActTransaction(act.ActId.Value, act.ActNo, actItems, act.IssueDate, businessEventId, 1);
            }

            if (newState == CommissionActStatusConst.Annulled)
            {
                //Transactions:
                var actItems = _commissionActRepository.GetActItems(act.ActId.Value, null, null, true);

                await CreatePostInvoicedCommissionTransaction(act.ActId.Value, businessEventId, 1);
                CreatePostCommissionActTransaction(act.ActId.Value, act.ActNo, actItems, act.IssueDate, businessEventId, -1);
            }
        }

        private void CreatePostCommissionActTransaction(long actId, string actNo, IList<CommissionActItem> actItems, DateTime postingDate, Guid businessEventId, int sign)
        {
            var journal = new PostTransactionJournal();
            journal.DocumentNo = actNo;
            journal.ProposedPostingDate = postingDate;
            journal.CurrencyCode = _coreSettings.LocalCurrencyCode;
            journal.DocumentTypeId = DocumentTypeConstsRGSL.CommissionAct;
            journal.Lines = new List<PostTransactionLine>();

            var mainContractNos = new Dictionary<string, string>();
            foreach (var referenceNo in actItems.Select(_ => _.ReferenceNo).Distinct())
            {
                string mainContractNo = _dimensionsRepository.GetMainContractNo(referenceNo);
                mainContractNos.Add(referenceNo, mainContractNo);
            }

            foreach (var actItem in actItems)
            {
                if (actItem.LcCommAmountFinal == 0)
                {
                    continue;
                }

                var line = new PostTransactionLine()
                {
                    ContractNumber = actItem.ReferenceNo,
                    MainContractNumber = mainContractNos[actItem.ReferenceNo],
                    SourceLineId = actItem.SourceLineId,
                    Amount = actItem.LcCommAmountFinal * sign,
                    Attributes = new PostTransactionLineAttrs
                    {
                        CommissionActId = actId,
                        TransactionTypeId = TransactionTypeEnum.CommissionAct,
                        IsRevaluation = false,
                        DocumentNo = actItem.ReferenceNo,
                        CancelledDocumentNo = sign == -1 ? actNo : null,
                        CommissionRate = actItem.CommRateFinal,
                        UseAgentCodes = true,
                    }
                };
                journal.Lines.Add(line);
            }

            if (journal.Lines.Any())
            {
                _journalServiceRgsl.PostTransaction(new PostTransactionRequest
                {
                    Journals = new List<PostTransactionJournal> { journal },
                    BusinessEventId = businessEventId,
                });
            }
        }

        private async Task CreatePostInvoicedCommissionTransaction(long actId, Guid businessEventId, int sign)
        {
            var stringRequest = $"{{\"actId\":{actId},\"sign\":{sign},\"businessEventId\":\"{businessEventId}\"}}";
            var request = new JsonObject(stringRequest);
            var response = await _integrationServiceExecutor.Execute("InvalidateInvoicedCommission", "1", request);
            if (response.Code == (int) IntegrationServiceResponseConst.Error)
            {
                var errorMessage = response.Content.ParsedJson["errorResponse"]["message"].ToString();
                throw new BusinessException(errorMessage);
            }
            if (response.Code != (int) IntegrationServiceResponseConst.Success)
            {
                string errorMessage = response.Content.ParsedJson.ToString();
                throw new InvalidOperationException(errorMessage);
            }
        }
    }
}
