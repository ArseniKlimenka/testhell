using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.PaymentOrder.Incoming;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Common.API.Shared.Services;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services.Strategy.PaymentOrder.Incoming
{
    public class PaymentOrderIncomingAllocationStrategyService : IAllocationStrategyServiceRGSL
    {
        private readonly IAllocationRepositoryRGSL _allocationRepositoryRGSL;
        private readonly IPaymentOrderIncomingAllocationStrategyRepository _repository;
        private readonly ITranslationServiceRGSL _translationServiceRGSL;

        public PaymentOrderIncomingAllocationStrategyService(
            IAllocationRepositoryRGSL allocationRepositoryRGSL,
            IPaymentOrderIncomingAllocationStrategyRepository paymentOrderIncomingAllocationStrategyRepository,
            ITranslationServiceRGSL translationServiceRGSL)
        {
            _allocationRepositoryRGSL = allocationRepositoryRGSL;
            _repository = paymentOrderIncomingAllocationStrategyRepository;
            _translationServiceRGSL = translationServiceRGSL;
        }

        public AllocationDocument GetAllocationDocument(string documentNo)
        {
            var installments = _repository.GetInstallmentsDetails(documentNo);
            string currencyCode = installments.Select(_ => _.CurrencyCode).Distinct().Single();

            var installment = new AllocationDocumentInstallment
            {
                Amount = installments.Sum(_ => _.Amount),
                OpenAmount = installments.Sum(_ => _.OpenAmount),
                CurrencyCode = currencyCode,
            };

            return new AllocationDocument
            {
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
            if (bsi.Direction != BankStatementItemDirectionRGSL.Incoming)
            {
                throw new BusinessException(_translationServiceRGSL.Translate("ACC_CF_WRONG_DIRECTION"));
            }

            if (allocation.PayCurrencyCode != allocation.DocCurrencyCode)
            {
                throw new NotSupportedException("Payment in different currency is not supported");
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
        }

        public void AfterMatchingCancellation(BankStatementItemRGSL bsi, AllocationRGSL allocation, IList<MatchingRGSL> cancelledMatchings, IList<MatchingRGSL> cancelingMatchings, Guid businessEventId)
        {
        }

        public Task FinishAllocations(string documentNo, IList<AllocationRGSL> createdAllocations, Guid businessEventId)
        {
            return Task.CompletedTask;
        }
    }
}
