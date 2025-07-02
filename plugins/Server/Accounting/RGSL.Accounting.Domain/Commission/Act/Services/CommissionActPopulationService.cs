using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Adacta.AdInsure.Core.API.Shared.Services;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.DataSource.Services;
using Adacta.AdInsure.Framework.Core.Domain.Entities.IntegrationService.Interfaces;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.Framework.Core.Sequence;
using Adacta.AdInsure.Framework.Core.Transactions;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Responses;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Interfaces;
using Adacta.AdInsure.RGSL.Common.API.Shared.Services;
using Adacta.AdInsure.RGSL.Common.Domain;
using Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Services;
using Newtonsoft.Json.Linq;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Services
{
    public class CommissionActPopulationService : ICommissionActPopulationService
    {
        private readonly ICommissionActPopulationRepository _commissionActPopulationRepository;
        private readonly ICommissionActService _commissionActService;
        private readonly ISequenceGenerator _sequenceGenerator;
        private readonly ICommissionActRepository _commissionActRepository;
        private readonly IInvoicedCommissionService _invoicedCommissionService;
        private readonly ICurrencyConverterService _currencyConverterService;
        private readonly IAaCommissionAppService _aaCommissionAppService;
        private readonly IDataSourceService _dataSourceService;
        private readonly IIntegrationServiceExecutor _integrationServiceExecutor;
        private readonly ITranslationServiceRGSL _translationServiceRGSL;

        public CommissionActPopulationService(
            ICommissionActPopulationRepository commissionActPopulationRepository,
            ICommissionActService commissionActService,
            ISequenceGenerator sequenceGenerator,
            ICommissionActRepository commissionActRepository,
            IInvoicedCommissionService invoicedCommissionService,
            ICurrencyConverterService currencyConverterService,
            IAaCommissionAppService aaCommissionAppService,
            IDataSourceService dataSourceService,
            IIntegrationServiceExecutor integrationServiceExecutor,
            ITranslationServiceRGSL translationServiceRGSL)
        {
            _commissionActPopulationRepository = commissionActPopulationRepository;
            _commissionActService = commissionActService;
            _sequenceGenerator = sequenceGenerator;
            _commissionActRepository = commissionActRepository;
            _invoicedCommissionService = invoicedCommissionService;
            _currencyConverterService = currencyConverterService;
            _aaCommissionAppService = aaCommissionAppService;
            _dataSourceService = dataSourceService;
            _integrationServiceExecutor = integrationServiceExecutor;
            _translationServiceRGSL = translationServiceRGSL;
        }

        [Transaction]
        public async Task<int> AutoPopulate(long? actId, string actNo, IList<string> referenceNumbers, DateTime? lastUpdated, bool renew)
        {
            return await AutoPopulateImpl(actId, actNo, referenceNumbers, lastUpdated, renew);
        }

        [Transaction]
        public async Task<PopulateWithFileResponse> PopulateWithFile(long? actId, string actNo, string fileId, bool skipFailed, DateTime? lastUpdated)
        {
            if (!actId.HasValue)
            {
                actId = _commissionActRepository.GetActs(new GetActsRequest { ActNo = actNo }).Single().ActId.Value;
            }

            _commissionActService.LockAct(actId.Value, lastUpdated);
            var act = _commissionActRepository.GetActs(new GetActsRequest { ActId = actId }).Single();
            if (act.StateCode != CommissionActStatusConst.Draft & act.StateCode != CommissionActStatusConst.Generating) throw new BusinessException("Only act in status 'Draft' could be modified");

            var fileItems = await ExecuteDataSource("PopulateActItemsDataLoader", fileId);

            var manualItems = new List<ManualActItem>(fileItems.Count);
            foreach (var fileItem in fileItems)
            {
                var itemNode = fileItem.SelectToken("resultData");
                var item = new ManualActItem
                {
                    AaExternalNumber = itemNode.SelectToken("aaExternalNumber").Value<string>(),
                    AgentShortName = itemNode.SelectToken("agentName").Value<string>(),
                    ContractNumber = itemNode.SelectToken("contractNumber").Value<string>(),
                    DueDate = itemNode.SelectToken("dueDate").Value<DateTime>(),
                    CommAmount = itemNode.SelectToken("commAmount").Value<decimal>(),
                };
                manualItems.Add(item);
            }

            var contractNumbers = manualItems.Select(_ => _.ContractNumber).ToList();
            var contracts = _aaCommissionAppService.GetContracts(new GetContractRequest { ContractNumbers = contractNumbers }).Contracts;
            var contractRisks = _commissionActPopulationRepository.GetContractRisks(contractNumbers).Items;

            var itemsToDelete = _commissionActRepository.GetActItems(actId.Value, null, contractNumbers, false);
            var itemIdsToDelete = itemsToDelete
                .Where(_ => _.LcCommAmountExtra.GetValueOrDefault() != 0m)
                .Select(_ => _.ActItemId)
                .ToList();

            _commissionActRepository.DeleteItems(actId.Value, itemIdsToDelete);

            var installmentAmountsRequest = manualItems
                .Select(_ => new
                {
                    _.ContractNumber,
                    _.DueDate,
                })
                .Distinct()
                .Select(_ => new InstallmentAmountsRequest
                {
                    ReferenceNo = _.ContractNumber,
                    DueDate = _.DueDate,
                })
                .ToList();
            var installmentAmounts = _commissionActRepository.GetInstallmentAmounts(installmentAmountsRequest).Items;
            var pcs = _commissionActRepository.GetAutoPopulationPc(act, null);

            var actItems = new List<CommissionActItem>();
            var errors = new List<string>();
            int processedItemsCount = 0;

            foreach (var manualItem in manualItems)
            {
                var contract = contracts.SingleOrDefault(_ => _.ContractNumber == manualItem.ContractNumber);
                if (contract == null)
                {
                    errors.Add(_translationServiceRGSL.Translate("ACC_CA_CONTRACTS_WAS_NOT_FOUND", manualItem.ContractNumber));
                    continue;
                }

                if (manualItem.AaExternalNumber != contract.AaExternalNumber)
                {
                    errors.Add(_translationServiceRGSL.Translate("ACC_CA_WRONG_AGENT_AGREEMENT_NAME", manualItem.ContractNumber));
                    continue;
                }

                if (manualItem.AgentShortName != contract.AgentShortName)
                {
                    errors.Add(_translationServiceRGSL.Translate("ACC_CA_WRONG_AGENT_NAME", manualItem.ContractNumber));
                    continue;
                }

                var duplicated = actItems.Find(_ => _.ReferenceNo == manualItem.ContractNumber && _.DueDate == manualItem.DueDate);
                if (duplicated != null)
                {
                    errors.Add(_translationServiceRGSL.Translate("ACC_CA_DUPLICATED_CONTRACT_NUMBER", manualItem.ContractNumber, manualItem.DueDate));
                    continue;
                }

                if (act.AgentAgreementNumber != contract.AaNumber)
                {
                    errors.Add(_translationServiceRGSL.Translate("ACC_CA_WRONG_AGENT_AGREEMENT_NUMBER", manualItem.ContractNumber));
                    continue;
                }

                if (act.AgentServiceProviderCode != contract.AgentCode)
                {
                    errors.Add(_translationServiceRGSL.Translate("ACC_CA_WRONG_AGENT_CODE", manualItem.ContractNumber));
                    continue;
                }

                var risks = contractRisks.Where(_ => _.ContractNumber == manualItem.ContractNumber).ToList();
                var commAmounts = AmountsHelper.GetDistribution(risks.Select(_ => _.Premium).ToArray(), manualItem.CommAmount);
                var actItemRisks = new List<CommissionActItem>(risks.Count);
                bool failed = false;

                for (int i = 0; i < risks.Count; i++)
                {
                    var risk = risks[i];
                    decimal commAmount = commAmounts[i];
                    if (commAmount == 0m)
                    {
                        continue;
                    }

                    var actItem = new CommissionActItem
                    {
                        ActId = actId.Value,
                        StatusId = CommissionActItemStatusId.New,
                        ReferenceNo = manualItem.ContractNumber,
                        SourceLineId = risk.RiskCode,
                        DocCurrencyCode = contract.CurrencyCode,
                        DueDate = manualItem.DueDate,
                        BankStatementItemId = null,

                        LcCommAmountExtra = commAmount,
                        LcCommAmountFinal = commAmount,
                        PaymentTransactionDate = manualItem.DueDate,
                        PaymentLcAmount = commAmount,
                    };

                    var installmentAmountItems = installmentAmounts
                        .SingleOrDefault(_ => _.ReferenceNo == actItem.ReferenceNo && _.DueDate == actItem.DueDate && _.SourceLineId == actItem.SourceLineId);
                    if (installmentAmountItems == null)
                    {
                        failed = true;
                        errors.Add(_translationServiceRGSL.Translate("ACC_CA_INSTALLMENT_WAS_NOT_FOUND", actItem.ReferenceNo, actItem.DueDate.ToString("dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture), actItem.SourceLineId));
                        break;
                    }
                    decimal installmentAmount = installmentAmountItems.InstallmentAmount;

                    actItem.InstallmentDocAmount = installmentAmount;
                    actItem.InstallmentLcAmount = GetLcAmount(actItem.DocCurrencyCode, actItem.DueDate, installmentAmount);

                    var paymentAmountItems = pcs.SingleOrDefault(_ => _.DocumentNo == actItem.ReferenceNo && _.InstallmentDueDate == actItem.DueDate && _.SourceLineId == actItem.SourceLineId);

                    if (paymentAmountItems != null)
					{

                        actItem.PaymentTransactionDate = paymentAmountItems.PaymentTransactionDate;
                        actItem.PaymentLcAmount = GetLcAmount(actItem.DocCurrencyCode, actItem.DueDate, paymentAmountItems.MatchingDocAmount);
                    }

                    actItemRisks.Add(actItem);
                }

                if (failed) continue;

                actItems.AddRange(actItemRisks);
                ++processedItemsCount;
            }

            ActHelper.CalculateVatAmountsByInstallments(act, actItems);

            if (!skipFailed && errors.Any())
            {
                throw new BusinessException(string.Join(Environment.NewLine, errors.Take(10)));
            }

            long currentItemId = _sequenceGenerator.GetNextValues("ACC_IMPL.CA_ACT_ITEM", actItems.Count) - actItems.Count;
            foreach (var actItem in actItems)
            {
                actItem.ActItemId = ++currentItemId;
            }

            _commissionActRepository.InsertActItem(actItems);
            _commissionActRepository.UpdateActHeader(actId.Value);
            await UpdateActItemJson(actNo);

            return new PopulateWithFileResponse
            {
                TotalFileItemsCount = manualItems.Count,
                ProcessedCount = processedItemsCount,
            };
        }

        private void FillInvoicedCommissions(List<CommissionActItem> actItems)
        {
            var byCoverages = actItems.GroupBy(_ => new
            {
                _.ReferenceNo,
                _.DueDate,
                _.SourceLineId,
            });

            var invoicedCommissions = GetInvoicedCommissions(actItems);
            foreach (var itemsForInvComm in byCoverages)
            {
                var invoicedCommission = invoicedCommissions.Items
                    .Where(_ =>
                        _.ContractNumber == itemsForInvComm.Key.ReferenceNo &&
                        _.DueDate == itemsForInvComm.Key.DueDate &&
                        _.ItemNo == itemsForInvComm.Key.SourceLineId)
                    .ToList();
                var rates = invoicedCommission
                    .GroupBy(_ => _.DocCommRate ?? _.AaCommRate ?? 0m)
                    .Select(_ => new { rate = _.Key, sum = _.Sum(ic => ic.CalcCommAmount) })
                    .OrderByDescending(_ => _.sum)
                    .ToList();

                decimal invoicedCommissionAmount = invoicedCommission.Sum(_ => _.CalcCommAmount);
                decimal[] proportions = itemsForInvComm
                    .Select(_ => Math.Abs(_.InstallmentDocAmount))
                    .ToArray();
                var invoicedCommissionAmounts = AmountsHelper.GetDistribution(proportions, invoicedCommissionAmount);

                var invCommItems = itemsForInvComm.ToArray();
                for (int i = 0; i < invCommItems.Length; i++)
                {
                    var item = invCommItems[i];
                    decimal amount = invoicedCommissionAmounts[i] * Math.Sign(item.LcCommAmountFinal);
                    if (rates.Any())
                    {
                        item.InvCommFinalRate = rates[0].rate;
                    }
                    item.InvCommDocAmount = amount;
                    item.InvCommLcAmount = GetLcAmount(item.DocCurrencyCode, item.DueDate, amount);
                }
            }
        }

        private void FillInstallmentAmounts(List<CommissionActItem> actItems)
        {
            var installmentAmounts = GetInstallmentAmounts(actItems);

            foreach (var actItem in actItems)
            {
                var installmentAmountItems = installmentAmounts.Items
                    .SingleOrDefault(_ => _.ReferenceNo == actItem.ReferenceNo && _.DueDate == actItem.DueDate && _.SourceLineId == actItem.SourceLineId);
                if (installmentAmountItems == null)
                {
                    throw new BusinessException(_translationServiceRGSL.Translate("ACC_CA_INSTALLMENT_WAS_NOT_FOUND", actItem.ReferenceNo, actItem.DueDate, actItem.SourceLineId));
                }
                decimal installmentAmount = installmentAmountItems.InstallmentAmount;

                actItem.InstallmentDocAmount = installmentAmount;
                actItem.InstallmentLcAmount = GetLcAmount(actItem.DocCurrencyCode, actItem.DueDate, installmentAmount);
            }
        }

        [Transaction]
        public async Task<int> RenewItem(long? actId, string actNo, DateTime? lastUpdated, IList<string> documentNumbers)
        {
            if (!actId.HasValue)
            {
                actId = _commissionActRepository.GetActs(new GetActsRequest { ActNo = actNo }).Single().ActId.Value;
            }

            _commissionActService.LockAct(actId.Value, lastUpdated);
            var act = _commissionActRepository.GetActs(new GetActsRequest { ActId = actId }).Single();
            if (act.StateCode != CommissionActStatusConst.Draft) throw new BusinessException("Only act in status 'Draft' could be modified");

            var itemsToDelete = _commissionActRepository.GetActItems(actId.Value, null, documentNumbers, false);
            var itemIdsToDelete = itemsToDelete
                .Where(_ => _.StatusId == CommissionActItemStatusId.Annulled)
                .Select(_ => _.ActItemId)
                .ToList();

            _commissionActRepository.DeleteItems(actId.Value, itemIdsToDelete);

            int affectedCount = await AutoPopulateImpl(actId, actNo, documentNumbers, null, true);
            _commissionActRepository.UpdateActHeader(actId.Value);
            return affectedCount;
        }

        private async Task<IList<JObject>> ExecuteDataSource(string dataSourceName, string fileId)
        {
            var data = new JObject();
            data.Add("fileId", fileId);

            var serviceRequest = new JObject();
            serviceRequest.Add("data", data);

            var response = await _dataSourceService.ExecuteAsync(dataSourceName, new JsonObject(serviceRequest), false);
            return response.ParsedJson["data"].Children<JObject>().ToList();
        }

        private async Task<int> AutoPopulateImpl(long? actId, string actNo, IList<string> referenceNumbers, DateTime? lastUpdated, bool renew)
        {
            if (!actId.HasValue)
            {
                actId = _commissionActRepository.GetActs(new GetActsRequest { ActNo = actNo }).Single().ActId.Value;
            }
            _commissionActService.LockAct(actId.Value, lastUpdated);
            var act = _commissionActRepository.GetActs(new GetActsRequest { ActId = actId }).Single();
            if (act.StateCode != CommissionActStatusConst.Draft & act.StateCode != CommissionActStatusConst.Generating) throw new BusinessException("Only act in status 'Draft' could be modified");

            var pcs = _commissionActRepository.GetAutoPopulationPc(act, referenceNumbers);
            await GetCommissionRates(pcs);

            var items = pcs.GroupBy(_ => new CommissionActAutoPopulationItemGroupKey(_)).ToList();
            var actItems = new List<CommissionActItem>(items.Count);
            var actItemPcs = new List<CommissionActItemPc>(pcs.Count);

            items = items
                .OrderBy(_ => _.Key.DocumentNo)
                .ThenBy(_ => _.Key.SourceLineId)
                .ThenBy(_ => _.Key.BankStatementItemId)
                .ToList();

            if (pcs.Any())
            {
                GenerateActItems(act, items, actItems, actItemPcs, renew);
            }

            if (!renew)
            {
                _commissionActRepository.UpdateItemStatus(actId.Value, CommissionActItemStatusId.Normal, null);
            }

            if (pcs.Any())
            {
                _commissionActRepository.InsertActItem(actItems);
                _commissionActRepository.InsertActItemPc(actItemPcs);
                _commissionActRepository.UpdateActHeader(actId.Value);
                await UpdateActItemJson(actNo);
            }

            return items.Count;
        }

        private void GenerateActItems(CommissionAct act, List<IGrouping<CommissionActAutoPopulationItemGroupKey, ActAutoPopulationPc>> items, List<CommissionActItem> actItems, List<CommissionActItemPc> actItemPcs, bool renew)
        {
            long currentItemId = _sequenceGenerator.GetNextValues("ACC_IMPL.CA_ACT_ITEM", items.Count) - items.Count;

            foreach (var item in items)
            {
                var actItem = new CommissionActItem
                {
                    ActItemId = ++currentItemId,
                    ActId = act.ActId.Value,
                    StatusId = renew ? CommissionActItemStatusId.Renew : CommissionActItemStatusId.New,
                    ReferenceNo = item.Key.DocumentNo,
                    SourceLineId = item.Key.SourceLineId,
                    DocCurrencyCode = item.Select(_ => _.DocCurrencyCode).Distinct().Single(),
                    PaymentTransactionDate = item.Select(_ => _.PaymentTransactionDate).Distinct().Single(),
                    DueDate = item.Key.InstallmentDueDate,
                    BankStatementItemId = item.Key.BankStatementItemId,

                    PaymentDocAmount = item.Sum(_ => _.MatchingDocAmount),

                    AaCommRate = item.Key.AaCommRate,
                    DocCommRate = item.Key.DocCommRate,

                    AaExpensesRate = item.Key.AaExpensesRate,
                    AaNaturalPersonRate = item.Key.AaNaturalPersonRate,
                    AaSolePropriatorRate = item.Key.AaSolePropriatorRate,

                    CommRateManual = item.Key.ManualCommRate,
                    CommRateFinal = item.Key.ManualCommRate ?? item.Key.DocCommRate ?? item.Key.AaCommRate,
                    CommRateCalc = item.Key.DocCommRate ?? item.Key.AaCommRate,

                    ExpensesRateFinal = item.Key.DocExpensesRate ?? item.Key.AaExpensesRate,
                    NaturalPersonRateFinal = item.Key.DocNaturalPersonRate ?? item.Key.AaNaturalPersonRate,
                    SolePropriatorRateFinal = item.Key.DocSolePropriatorRate ?? item.Key.AaSolePropriatorRate,

                    IsTechnical = item.Key.IsTechnical,
                };

                actItem.PaymentLcAmount = GetLcAmount(actItem.DocCurrencyCode, actItem.DueDate, actItem.PaymentDocAmount.Value);

                actItem.ExpensesAmount = AmountsHelper.RoundCurrency(actItem.PaymentDocAmount.Value * actItem.ExpensesRateFinal);
                actItem.NaturalPersonAmount = AmountsHelper.RoundCurrency(actItem.PaymentDocAmount.Value * actItem.NaturalPersonRateFinal);
                actItem.SolePropriatorAmount = AmountsHelper.RoundCurrency(actItem.PaymentDocAmount.Value * actItem.SolePropriatorRateFinal);

                actItems.Add(actItem);

                var newActItemPcs = item.Select(_ => new CommissionActItemPc
                {
                    ActId = actItem.ActId,
                    ActItemId = actItem.ActItemId,
                    PayableCommissionId = _.PayableCommissionId,
                });
                actItemPcs.AddRange(newActItemPcs);
            }

            CalculateAmountsForInstallments(actItems);
            ActHelper.CalculateVatAmountsByInstallments(act, actItems);
            FillInstallmentAmounts(actItems);
            FillInvoicedCommissions(actItems);
        }

        private static void CalculateAmountsForInstallments(List<CommissionActItem> actItems)
        {
            var itemsByInstallments = actItems.GroupBy(_ => new
            {
                _.ReferenceNo,
                _.DueDate,
                _.CommRateFinal,
            });
            foreach (var itemsByInstallment in itemsByInstallments)
            {
                var installmentActItems = itemsByInstallment.ToArray();
                decimal paymentLcAmount = installmentActItems.Sum(_ => _.PaymentLcAmount.Value);
                decimal installmentLcCommAmountFinal = AmountsHelper.RoundCurrency(paymentLcAmount * itemsByInstallment.Key.CommRateFinal.Value);

                var proportions = installmentActItems.Select(_ => Math.Abs(_.PaymentDocAmount.Value)).ToArray();
                var commissionAmounts = AmountsHelper.GetDistribution(proportions, installmentLcCommAmountFinal);

                for (int i = 0; i < installmentActItems.Length; i++)
                {
                    var actItem = installmentActItems[i];
                    decimal amount = commissionAmounts[i];
                    actItem.LcCommAmountFinal = amount;
                }
            }

            var itemsByInstallmentCalc = actItems.GroupBy(_ => new
            {
                _.ReferenceNo,
                _.DueDate,
                _.CommRateCalc,
            });
            foreach (var itemsByInstallment in itemsByInstallmentCalc)
            {
                var installmentActItems = itemsByInstallment.ToArray();
                decimal paymentLcAmount = installmentActItems.Sum(_ => _.PaymentLcAmount.Value);
                decimal installmentLcCommAmountFinal = AmountsHelper.RoundCurrency(paymentLcAmount * itemsByInstallment.Key.CommRateCalc.Value);

                var proportions = installmentActItems.Select(_ => Math.Abs(_.PaymentDocAmount.Value)).ToArray();
                var commissionAmounts = AmountsHelper.GetDistribution(proportions, installmentLcCommAmountFinal);

                for (int i = 0; i < installmentActItems.Length; i++)
                {
                    var actItem = installmentActItems[i];
                    decimal amount = commissionAmounts[i];
                    actItem.LcCommAmountCalc = amount;
                }
            }
        }

        private async Task GetCommissionRates(IList<ActAutoPopulationPc> pcs)
        {
            if (!pcs.Any())
            {
                return;
            }

            var refNumbers = pcs.Select(_ => _.DocumentNo)
                .Distinct()
                .ToList();
            var commissionsResponce = await _aaCommissionAppService.CalculateCommission(new CalculateCommissionRequest { ContractNumbers = refNumbers });
            var commissions = commissionsResponce.CommissionRules;

            foreach (var pc in pcs)
            {
                var polCommissions = commissions.Where(_ => _.ContractNumber == pc.DocumentNo && _.DueDate == pc.InstallmentDueDate).ToList();

                if (polCommissions.Count > 1)
                {
                    throw new InvalidOperationException("There should be only one commission for " + pc.DocumentNo + ", " + pc.InstallmentDueDate.ToString(CultureInfo.InvariantCulture));
                }

                var polCommission = polCommissions.SingleOrDefault();
                if (polCommission == null)
                {
                    pc.AaCommRate = 0m;
                    continue;
                }

                pc.AaCommRate = polCommission.CommRate.Value;
                pc.AaExpensesRate = polCommission.ExpensesRate;
                pc.AaNaturalPersonRate = polCommission.NaturalPersonRate;
                pc.AaSolePropriatorRate = polCommission.SolePropriatorRate;
            }
        }

        private InvoicedCommissionResponse GetInvoicedCommissions(List<CommissionActItem> actItems)
        {
            var invoicedCommissionRequest = actItems
                .Select(_ => new
                {
                    ContractNumber = _.ReferenceNo,
                    DueDate = _.DueDate,
                })
                .Distinct()
                .Select(_ => new InvoicedCommissionRequest
                {
                    ContractNumber = _.ContractNumber,
                    DueDate = _.DueDate,
                })
                .ToList();

            return _invoicedCommissionService.GetInvoicedCommission(invoicedCommissionRequest);
        }

        private InstallmentAmountsResponse GetInstallmentAmounts(List<CommissionActItem> actItems)
        {
            var installmentAmountsRequest = actItems
                .Select(_ => new
                {
                    _.ReferenceNo,
                    _.DueDate,
                })
                .Distinct()
                .Select(_ => new InstallmentAmountsRequest
                {
                    ReferenceNo = _.ReferenceNo,
                    DueDate = _.DueDate,
                })
                .ToList();

            return _commissionActRepository.GetInstallmentAmounts(installmentAmountsRequest);
        }

        private decimal GetLcAmount(string documentCurrencyCode, DateTime dueDate, decimal amount)
        {
            var response = _currencyConverterService.ToLocalCurrency(amount, documentCurrencyCode, dueDate);
            return response.Money.Amount;
        }

        private async Task UpdateActItemJson(string actNumber)
        {
            string stringRequest = "{\"actNo\":\"" + actNumber + "\"}";
            var request = new JsonObject(stringRequest);
            var response = await _integrationServiceExecutor.Execute("UpdateActItemJson", "1", request);
            if (response.Code == (int) IntegrationServiceResponseConst.Error)
            {
                string errorMessage = response.Content.ParsedJson["errorResponse"]["message"].ToString();
                throw new BusinessException(errorMessage);
            }
            if (response.Code != (int) IntegrationServiceResponseConst.Success)
            {
                string errorMessage = response.Content.ParsedJson.ToString();
                throw new InvalidOperationException(errorMessage);
            }
        }

        class ManualActItem
        {
            public string AaExternalNumber { get; set; }
            public string AgentShortName { get; set; }
            public string ContractNumber { get; set; }
            public DateTime DueDate { get; set; }
            public decimal CommAmount { get; set; }
        }
    }
}
