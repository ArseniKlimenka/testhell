using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests
{
    public class AllocationCancelRequest
    {
        public long AllocationId { get; set; }
        public bool CancelOverpayments { get; set; }
        public Guid BusinessEventId { get; set; }
    }
}