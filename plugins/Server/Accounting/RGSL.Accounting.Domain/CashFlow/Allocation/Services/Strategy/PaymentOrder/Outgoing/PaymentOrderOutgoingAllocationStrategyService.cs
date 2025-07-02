using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Adacta.AdInsure.Accounting.APIInternal.PaymentOrders.Services;
using Adacta.AdInsure.Framework.Core.ApplicationContext;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Subledger.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.PaymentOrder.Outgoing;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.DTO;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.Journal.Interfaces;
using Adacta.AdInsure.RGSL.Common.API.Shared.Services;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services.Strategy.PaymentOrder.Outgoing
{
    public class PaymentOrderOutgoingAllocationStrategyService : IAllocationStrategyServiceRGSL
    {
        private readonly IAllocationRepositoryRGSL _allocationRepositoryRGSL;
        private readonly IPaymentOrderOutgoingAllocationStrategyRepository _repository;
        private readonly IPaymentOrderService _paymentOrderService;
        private readonly IPaymentOrderRepositoryRGSL _paymentOrderRepository;
        private readonly ICommissionActRepository _commissionActRepository;
        private readonly IDimensionsRepository _dimensionsRepository;
        private readonly IJournalServiceRgsl _journalServiceRgsl;
        private readonly ITranslationServiceRGSL _translationServiceRGSL;

        public PaymentOrderOutgoingAllocationStrategyService(
            IAllocationRepositoryRGSL allocationRepositoryRGSL,
            IPaymentOrderOutgoingAllocationStrategyRepository repository,
            IPaymentOrderService paymentOrderService,
            IPaymentOrderRepositoryRGSL paymentOrderRepository,
            ICommissionActRepository commissionActRepository,
            IDimensionsRepository dimensionsRepository,
            IJournalServiceRgsl journalServiceRgsl,
            ITranslationServiceRGSL translationServiceRGSL
            )
        {
            _allocationRepositoryRGSL = allocationRepositoryRGSL;
            _repository = repository;
            _paymentOrderService = paymentOrderService;
            _paymentOrderRepository = paymentOrderRepository;
            _commissionActRepository = commissionActRepository;
            _dimensionsRepository = dimensionsRepository;
            _journalServiceRgsl = journalServiceRgsl;
            _translationServiceRGSL = translationServiceRGSL;
        }

        public AllocationDocument GetAllocationDocument(string documentNo)
        {
            var installments = _repository.GetInstallmentsDetails(documentNo);
            string currencyCode = installments.Select(_ => _.CurrencyCode).Distinct().Single();
            string state = installments.Select(_ => _.StateCode).Distinct().Single();
            bool nonAcceptance = installments.Select(_ => _.NonAcceptance).Distinct().Single();

            var installment = new AllocationDocumentInstallment
            {
                Amount = installments.Sum(_ => _.Amount),
                OpenAmount = installments.Sum(_ => _.OpenAmount),
                CurrencyCode = currencyCode,
            };

            return new PaymentOrderOutgoingAllocationDocument
            {
                DocumentNo = documentNo,
                State = state,
                NonAcceptance = nonAcceptance,
                AllocationInstallments = new List<AllocationDocumentInstallment> { installment },
            };
        }

        public List<AllocationDocumentInstallmentDetails> GetAllocationInstallmentDetailsCollection(long allocationId)
        {
            var allocation = _allocationRepositoryRGSL.GetAllocations(new GetAllocationsRequest { AllocationId = allocationId }).Single();
            var installments = _repository.GetInstallmentsDetails(allocation.DocumentNo);

            var detailsCollection = installments
                .Select(_ => new AllocationDocumentInstallmentDetails
                {
                    Amount = _.Amount,
                    OpenAmount = _.OpenAmount,
                })
                .ToList();

            if (detailsCollection.Count != 1)
            {
                throw new InvalidOperationException("There should be only the one detail for the payment order!");
            }

            return detailsCollection;
        }

        public void BeforeAllocation(BankStatementItemRGSL bsi, AllocationRGSL allocation, AllocationDocument allocationDocument, AllocationDocumentInstallment installment)
        {
            var poOutAllocDoc = (PaymentOrderOutgoingAllocationDocument) allocationDocument;

            if (bsi.Direction != BankStatementItemDirectionRGSL.Outgoing)
            {
                throw new BusinessException(_translationServiceRGSL.Translate("ACC_CF_WRONG_DIRECTION"));
            }

            if (allocation.PayCurrencyCode != allocation.DocCurrencyCode)
            {
                throw new NotSupportedException("Payment in different currency is not supported");
            }

            if (allocation.DocAmount > 0)
            {
                if (poOutAllocDoc.State != "Approved")
                {
                    throw new BusinessException("The document must be in 'Approved' state");
                }
            }
            else
            {
                if (poOutAllocDoc.State != "Approved" &&
                    poOutAllocDoc.State != "Paid")
                {
                    throw new BusinessException("Cancellation in this document status is not allowed");
                }
            }

            if (poOutAllocDoc.NonAcceptance != bsi.NonAcceptance)
            {
                throw new BusinessException("The document and payment must have the same non-acceptance parameter value");
            }
        }

        public void AfterAllocation(BankStatementItemRGSL bsi, AllocationRGSL allocation, AllocationDocument allocationDocument, AllocationDocumentInstallment installment)
        {
        }

        public Task BeforeAllocationCancellation(AllocationCancelRequest request, AllocationRGSL cancelledAllocation)
        {
            return Task.CompletedTask;
        }

        public void AfterAllocationCancellation(AllocationRGSL cancelledAllocation, AllocationRGSL cancelingAllocation)
        {
        }

        public void AfterMatching(BankStatementItemRGSL bsi, AllocationRGSL allocation, MatchingRGSL matching, AllocationDocumentInstallmentDetails allocationInstallmentDetails, Guid businessEventId)
        {
            CreatePaymentOrderAllocationTransaction(allocation.DocumentNo, bsi.BankStatementItemId, bsi.TransactionDate, matching.DocAmount, businessEventId);
        }

        public void AfterMatchingCancellation(BankStatementItemRGSL bsi, AllocationRGSL allocation, IList<MatchingRGSL> cancelledMatchings, IList<MatchingRGSL> cancelingMatchings, Guid businessEventId)
        {
            decimal docAmount = cancelingMatchings.Sum(_ => _.DocAmount);
            CreatePaymentOrderAllocationTransaction(allocation.DocumentNo, bsi.BankStatementItemId, bsi.TransactionDate, docAmount, businessEventId);
        }

        public async Task FinishAllocations(string documentNo, IList<AllocationRGSL> createdAllocations, Guid businessEventId)
        {
            var allocDoc = GetAllocationDocument(documentNo);
            var poOutAllocDoc = (PaymentOrderOutgoingAllocationDocument) allocDoc;
            decimal openAmount = poOutAllocDoc.AllocationInstallments.Sum(_ => _.OpenAmount);

            if (poOutAllocDoc.State == "Approved" & openAmount == 0)
            {
                var options = new ImpersonationOptions(SpecialUsersConsts.SystemUserId, RGSL.Common.API.Constants.Actor.System);

                using var impersonation = new ApplicationContextImpersonation(options);
                await _paymentOrderService.MakeTransitionAsync("PaymentOrder", "1", poOutAllocDoc.DocumentNo, "Approved_to_Paid", true, new JsonObject("{}"));
            }
        }

        private void CreatePaymentOrderAllocationTransaction(string paymentOrderNumber, long? bsiId, DateTime postingDate, decimal amount, Guid businessEventId)
        {
            PaymentOrderDto paymentOrder = _paymentOrderRepository.GetPaymentOrder(paymentOrderNumber);

            if (paymentOrder.PaymentOrderType == PaymentOrderTypeConst.Claim)
            {
                string selectedRiskCode;
                if (paymentOrder.PaymentOrderSubType == PaymentOrderSubTypeConst.Endowment ||
                    paymentOrder.PaymentOrderSubType == PaymentOrderSubTypeConst.EndowmentPIT)
                {
                    var endowmentInfo = _dimensionsRepository.GetEndowmentInfo(paymentOrder.ReferenceNumber);
                    selectedRiskCode = endowmentInfo.SelectedRiskCode;
                }
                else
                {
                    var claimInfo = _dimensionsRepository.GetClaimInfo(paymentOrder.ReferenceNumber);
                    selectedRiskCode = claimInfo.SelectedRiskCode;
                }

                PostAllocationTransaction(paymentOrder.PaymentOrderNumber, bsiId, paymentOrder.ReferenceNumber, postingDate, paymentOrder.PaymentOrderCurrencyCode, amount, selectedRiskCode,
                    DocumentTypeConstsRGSL.PaymentOrderAllocation, paymentOrder.ContractAmendmentNumber, paymentOrder.ContractNumber, businessEventId, null, paymentOrder.RecipientPartyCode);
            }
            else if (paymentOrder.PaymentOrderType == PaymentOrderTypeConst.Commission)
            {
                var act = _commissionActRepository.GetActs(new GetActsRequest { ActNo = paymentOrder.ReferenceNumber }).Single();

                PostAllocationTransaction(paymentOrder.PaymentOrderNumber, bsiId, paymentOrder.ReferenceNumber, postingDate, paymentOrder.PaymentOrderCurrencyCode, amount, null,
                    DocumentTypeConstsRGSL.PaymentOrderCommission, null, null, businessEventId, act.AgentServiceProviderCode, paymentOrder.RecipientPartyCode);
            }
            else if (paymentOrder.PaymentOrderType == PaymentOrderTypeConst.PaymentRefund)
            {
                PostAllocationTransaction(paymentOrder.PaymentOrderNumber, bsiId, paymentOrder.ReferenceNumber, postingDate, paymentOrder.PaymentOrderCurrencyCode, amount, null,
                    DocumentTypeConstsRGSL.PaymentOrderRefundFix, null, null, businessEventId, null, paymentOrder.RecipientPartyCode);
                PostAllocationTransaction(paymentOrder.PaymentOrderNumber, bsiId, paymentOrder.ReferenceNumber, postingDate, paymentOrder.PaymentOrderCurrencyCode, amount, null,
                    DocumentTypeConstsRGSL.PaymentOrderAllocation, null, null, businessEventId, null, paymentOrder.RecipientPartyCode);
            }
            else if (paymentOrder.PaymentOrderType == PaymentOrderTypeConst.PolicyCancellation)
            {
                if (paymentOrder.PaymentOrderSubType == PaymentOrderSubTypeConst.PIT)
                {
                    PostAllocationTransaction(paymentOrder.PaymentOrderNumber, bsiId, paymentOrder.ReferenceNumber, postingDate, paymentOrder.PaymentOrderCurrencyCode, amount, paymentOrder.MainRiskCode,
                        DocumentTypeConstsRGSL.PaymentOrderPolicyCancellationPIT, paymentOrder.ContractAmendmentNumber, paymentOrder.ContractNumber, businessEventId, null, paymentOrder.RecipientPartyCode);
                }
                else
                {
                    PostAllocationTransaction(paymentOrder.PaymentOrderNumber, bsiId, paymentOrder.ReferenceNumber, postingDate, paymentOrder.PaymentOrderCurrencyCode, amount, paymentOrder.MainRiskCode,
                        DocumentTypeConstsRGSL.PaymentOrderAllocation, paymentOrder.ContractAmendmentNumber, paymentOrder.ContractNumber, businessEventId, null, paymentOrder.RecipientPartyCode);
                }
            }
        }

        private void PostAllocationTransaction(string paymentOrderNumber, long? bsiId, string documentNo, DateTime postingDate, string currencyCode, decimal amount, string sourceLineId, int refDocumentType, string contractNo, string mainContractNo, Guid businessEventId, string serviceProviderNumber, string partyCode, DateTime? dateToCheckPrevPeriod = null)
        {
            var journal = new PostTransactionJournal();
            journal.DocumentNo = paymentOrderNumber;
            journal.ProposedPostingDate = postingDate;
            journal.CurrencyCode = currencyCode;
            journal.DocumentTypeId = refDocumentType;
            journal.Lines = new List<PostTransactionLine>();

            var line = new PostTransactionLine()
            {
                ContractNumber = contractNo ?? mainContractNo,
                MainContractNumber = mainContractNo,
                SourceLineId = sourceLineId,
                Amount = amount,
                Attributes = new PostTransactionLineAttrs
                {
                    BankStatementItemId = bsiId,
                    PaymentOrderNumber = paymentOrderNumber,
                    TransactionTypeId = TransactionTypeEnum.PaymentAllocation,
                    IsRevaluation = false,
                    DocumentNo = documentNo,
                    DateToCheckPrevPeriod = dateToCheckPrevPeriod,

                    ServiceProviderCode = serviceProviderNumber,
                    PartyCode = partyCode,
                }
            };
            journal.Lines.Add(line);

            _journalServiceRgsl.PostTransaction(new PostTransactionRequest
            {
                Journals = new List<PostTransactionJournal> { journal },
                BusinessEventId = businessEventId,
            });
        }
    }
}
