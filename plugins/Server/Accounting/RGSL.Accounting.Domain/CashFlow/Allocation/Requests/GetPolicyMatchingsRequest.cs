using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests
{
    public class GetPolicyMatchingsRequest
    {
        public IList<long> MatchingIds { get; set; }
        public long? MatchingId { get; set; }
        public string DocumentNo { get; set; }
        public DateTime? DueDate { get; set; }
        public bool WithCancellations { get; set; }
    }
}
