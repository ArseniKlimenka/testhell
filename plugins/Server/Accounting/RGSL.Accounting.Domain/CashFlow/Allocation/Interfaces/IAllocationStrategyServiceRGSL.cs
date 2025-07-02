using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces
{
    public interface IAllocationStrategyServiceRGSL
    {
        AllocationDocument GetAllocationDocument(string documentNo);
        List<AllocationDocumentInstallmentDetails> GetAllocationInstallmentDetailsCollection(long allocationId);

        void BeforeAllocation(BankStatementItemRGSL bsi, AllocationRGSL allocation, AllocationDocument allocationDocument, AllocationDocumentInstallment allocationInstallment);
        void AfterAllocation(BankStatementItemRGSL bsi, AllocationRGSL allocation, AllocationDocument allocationDocument, AllocationDocumentInstallment allocationInstallment);
        Task BeforeAllocationCancellation(AllocationCancelRequest request, AllocationRGSL cancelledAllocation);
        void AfterAllocationCancellation(AllocationRGSL cancelledAllocation, AllocationRGSL cancelingAllocation);
        void AfterMatching(BankStatementItemRGSL bsi, AllocationRGSL allocation, MatchingRGSL matching, AllocationDocumentInstallmentDetails allocationInstallmentDetails, Guid businessEventId);
        void AfterMatchingCancellation(BankStatementItemRGSL bsi, AllocationRGSL allocation, IList<MatchingRGSL> cancelledMatchings, IList<MatchingRGSL> cancelingMatchings, Guid businessEventId);
        Task FinishAllocations(string documentNo, IList<AllocationRGSL> createdAllocations, Guid businessEventId);
    }
}
