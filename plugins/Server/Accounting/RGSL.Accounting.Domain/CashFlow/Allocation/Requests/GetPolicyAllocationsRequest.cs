using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests
{
    public class GetPolicyAllocationsRequest
    {
        public IList<long> AllocationIds { get; set; }
        public long? AllocationId { get; set; }
    }
}
