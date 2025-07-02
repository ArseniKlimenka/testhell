using Adacta.AdInsure.RGSL.PAS.API.Shared.Constants;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.Policy.Responses
{
    public class GetPolicyInfoResponse
    {
        public RGSLPolicyStatusEnum StateCode { get; set; }
        public string InsuredCode { get; set; }
        public decimal? ManualExchangeRate { get; set; }
    }
}
