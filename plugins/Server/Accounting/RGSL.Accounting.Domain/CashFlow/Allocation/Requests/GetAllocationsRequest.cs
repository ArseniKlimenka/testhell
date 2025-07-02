using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests
{
    public class GetAllocationsRequest
    {
        public IList<long> AllocationIds { get; set; }
        public long? AllocationId { get; set; }
        public long? BankStatementItemId { get; set; }
        public string DocumentNo { get; set; }
        public long? AllocationIdFromExclusive { get; set; }
        public bool NoCancelations { get; set; }
    }
}
