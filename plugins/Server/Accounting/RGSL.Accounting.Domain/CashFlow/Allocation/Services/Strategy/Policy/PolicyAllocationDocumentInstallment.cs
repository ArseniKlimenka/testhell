using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services.Strategy.Policy
{
    public class PolicyAllocationDocumentInstallment : AllocationDocumentInstallment
    {
        public DateTime DueDate { get; set; }
        public bool IsFirstInstallment { get; set; }
    }
}