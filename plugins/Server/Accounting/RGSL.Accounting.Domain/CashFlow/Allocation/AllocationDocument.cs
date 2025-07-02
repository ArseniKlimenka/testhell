using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation
{
    public class AllocationDocument
    {
        public decimal? ManualExchangeRate { get; set; }
        public List<AllocationDocumentInstallment> AllocationInstallments { get; set; }
    }
}