using Adacta.AdInsure.RGSL.PAS.API.Shared.Constants;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services.Strategy.Policy
{
    public class PolicyAllocationDocument : AllocationDocument
    {
        public RGSLPolicyStatusEnum StateCode { get; set; }
        public string InsuredCode { get; set; }
    }
}