using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests
{
    public class GetMatchingRequest
    {
        public long? AllocationId { get; set; }
        public bool NoCancelations { get; set; }
        public IList<long> MatchingIds { get; set; }
    }
}