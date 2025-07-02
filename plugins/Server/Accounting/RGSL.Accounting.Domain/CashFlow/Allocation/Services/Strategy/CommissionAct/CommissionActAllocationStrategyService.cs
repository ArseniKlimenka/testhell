using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Adacta.AdInsure.Core.API.UniversalDocument.Services;
using Adacta.AdInsure.Framework.Core.ApplicationContext;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.CommissionAct;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Common.API.Shared.Services;
using MoreLinq;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services.Strategy.CommissionAct
{
    public class CommissionActAllocationStrategyService : IAllocationStrategyServiceRGSL
    {
        private readonly IAllocationRepositoryRGSL _allocationRepositoryRGSL;
        private readonly ICommissionActAllocationStrategyRepository _repository;
        private readonly IUniversalDocumentService _universalDocumentService;
        private readonly ITranslationServiceRGSL _translationServiceRGSL;

        public CommissionActAllocationStrategyService(
            IAllocationRepositoryRGSL allocationRepositoryRGSL,
            ICommissionActAllocationStrategyRepository commissionActAllocationStrategyRepository,
            IUniversalDocumentService universalDocumentService,
            ITranslationServiceRGSL translationServiceRGSL)
        {
            _allocationRepositoryRGSL = allocationRepositoryRGSL;
            _repository = commissionActAllocationStrategyRepository;
            _universalDocumentService = universalDocumentService;
            _translationServiceRGSL = translationServiceRGSL;
        }

        public AllocationDocument GetAllocationDocument(string documentNo)
        {
            var installments = _repository.GetDocumentDetails(documentNo);
            string currencyCode = installments.Select(_ => _.CurrencyCode).Distinct().Single();
            string state = installments.Select(_ => _.StateCode).Distinct().Single();

            var installment = new AllocationDocumentInstallment
            {
                Amount = installments.Sum(_ => _.Amount),
                OpenAmount = installments.Sum(_ => _.OpenAmount),
                CurrencyCode = currencyCode,
            };

            return new CommissionActAllocationDocument
            {
                StateCode = state,
                AllocationInstallments = new List<AllocationDocumentInstallment> { installment },
            };
        }

        public List<AllocationDocumentInstallmentDetails> GetAllocationInstallmentDetailsCollection(long allocationId)
        {
            var allocation = _allocationRepositoryRGSL.GetAllocations(new GetAllocationsRequest { AllocationId = allocationId }).Single();
            var installments = _repository.GetDocumentDetails(allocation.DocumentNo);

            var detailsCollection = installments
                .Select(_ => new AllocationDocumentInstallmentDetails
                {
                    Amount = _.Amount,
                    OpenAmount = _.OpenAmount,
                })
                .ToList();

            if (detailsCollection.Count != 1)
            {
                throw new InvalidOperationException("There should be only the one detail for the document!");
            }

            return detailsCollection;
        }

        public void BeforeAllocation(BankStatementItemRGSL bsi, AllocationRGSL allocation, AllocationDocument allocationDocument, AllocationDocumentInstallment installment)
        {
            if (bsi.Direction != BankStatementItemDirectionRGSL.Incoming)
            {
                throw new BusinessException(_translationServiceRGSL.Translate("ACC_CF_WRONG_DIRECTION"));
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

        public async Task FinishAllocations(string documentNo, IList<AllocationRGSL> createdAllocations, Guid businessEventId)
        {
            var allocDoc = (CommissionActAllocationDocument) GetAllocationDocument(documentNo);
            var installments = allocDoc.AllocationInstallments;

            if (allocDoc.StateCode == "Approved")
            {
                var firstInstallment = installments.Single();
                if (firstInstallment.OpenAmount == 0)
                {
                    var options = new ImpersonationOptions(SpecialUsersConsts.SystemUserId, RGSL.Common.API.Constants.Actor.System);

                    using var impersonation = new ApplicationContextImpersonation(options);
                    await _universalDocumentService.MakeTransitionAsync("CommissionAct", "1", documentNo, "Approved_To_CompletedPaidNegative", null);
                }
            }
        }
    }
}
