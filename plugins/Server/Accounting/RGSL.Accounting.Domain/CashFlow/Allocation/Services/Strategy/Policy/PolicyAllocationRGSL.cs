using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services.Strategy.Policy
{
    public class PolicyAllocationRGSL
    {
        public long? AllocationId { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsFirstInstallment { get; set; }
        public decimal ExchangeDifference { get; set; }
    }
}