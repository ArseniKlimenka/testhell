using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services.Strategy.Policy
{
    public class PolicyAllocationDocumentInstallmentDetails : AllocationDocumentInstallmentDetails
    {
        public DateTime PostingDate { get; set; }
        public string ObjectCode { get; set; }
        public string SourceLineId { get; set; }
        public bool IsLife { get; set; }
    }
}