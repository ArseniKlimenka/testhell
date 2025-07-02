using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Requests
{
    public class AllocateRequest
    {
        public long BankStatementItemId { get; set; }
        public decimal PayAmount { get; set; }
        public decimal? DocAmount { get; set; }
        public string ReferenceNo { get; set; }
        public AllocationToleranceType ToleranceType { get; set; }
        public bool AllowAllocationAmountDeviation { get; set; }
    }
}