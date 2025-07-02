using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services.Strategy.Policy;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement;
using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces.Posting
{
    public interface IPolicyMatchingPostingServiceRGSL
    {
        void Post(BankStatementItemRGSL bsi, AllocationRGSL allocation, PolicyAllocationRGSL policyAllocation, MatchingRGSL matching, PolicyMatchingRGSL policyMatching, Guid businessEventId);
        void PostCancellation(BankStatementItemRGSL bsi, AllocationRGSL allocation, MatchingRGSL matching, PolicyMatchingRGSL policyMatching, Guid businessEventId);
        void PaymentAllocation(BankStatementItemRGSL bsi, AllocationRGSL allocation, MatchingRGSL matching, PolicyMatchingRGSL policyMatching, Guid businessEventId);
    }
}
