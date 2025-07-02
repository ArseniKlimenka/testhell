using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.InvestmentProfit.Responses
{
    public class AllocationResponse
    {
        public IEnumerable<AllocatedRecord> AllocatedItems { get; set; }
    }
}
