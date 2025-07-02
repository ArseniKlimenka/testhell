using Newtonsoft.Json;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Responses
{
    public class AllocateResponse
    {
        [JsonProperty("allocatedAmount")]
        public decimal AllocatedAmount { get; set; }
        [JsonProperty("allocationIds")]
        public List<long> AllocationIds { get; set; }
    }
}