using System.Collections.Generic;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.Policy.DTO;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.Policy.Request;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.Policy.Responses;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services.Strategy.Policy;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.Policy
{
    public interface IPolicyAllocationStrategyRepository
    {
        void CreateAllocation(PolicyAllocationRGSL policyAllocation);
        IList<PolicyAllocationRGSL> GetAllocations(GetPolicyAllocationsRequest request);
        IList<PolicyMatchingRGSL> GetMatchings(GetPolicyMatchingsRequest request);
        void CreateMatching(IList<PolicyMatchingRGSL> policyMatchings);
        List<PolicyInstallmentDetailsDto> GetInstallmentsDetails(GetInstallmentsDetailsRequest request);
        GetPolicyInfoResponse GetPolicyInfo(string referenceNo);
    }
}
