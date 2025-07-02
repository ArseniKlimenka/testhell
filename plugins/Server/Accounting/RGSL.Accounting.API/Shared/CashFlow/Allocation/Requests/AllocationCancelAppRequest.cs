using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Requests
{
    public class AllocationCancelAppRequest
    {
        public List<long> AllocationIds { get; set; }
        public bool CancelOverpayments { get; set; }
    }
}
