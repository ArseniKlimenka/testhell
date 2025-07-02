using Newtonsoft.Json;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Responses
{
    public class AutoAllocateResponse
    {
        public AutoAllocateResponse()
        {
            this.AllocationResponses = new List<AutoAllocationItemResponse>();
        }
        [JsonProperty("allocationResponses")]
        public List<AutoAllocationItemResponse> AllocationResponses { get; set; }
    }

    public class AutoAllocationItemResponse
    {
        [JsonProperty("bankStatementItemNo")]
        public string BankStatementItemNo { get; set; }
        [JsonProperty("referenceNo")]
        public string ReferenceNo { get; set; }
        [JsonProperty("allocatedAmount")]
        public decimal AllocatedAmount { get; set; }
        [JsonProperty("allocationError")]
        public string AllocationError { get; set; }
    }
}