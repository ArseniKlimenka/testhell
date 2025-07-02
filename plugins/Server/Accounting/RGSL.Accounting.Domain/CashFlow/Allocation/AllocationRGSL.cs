using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation
{
    public class AllocationRGSL
    {
        public long? AllocationId { get; set; }
        public bool Cancelled { get; set; }
        public long? CancelledAllocationId { get; set; }
        public long BankStatementItemId { get; set; }
        public decimal PayAmount { get; set; }
        public decimal DocAmount { get; set; }
        public decimal ToleranceDocAmount { get; set; }
        public string PayCurrencyCode { get; set; }
        public string DocCurrencyCode { get; set; }
        public decimal PayRate { get; set; }
        public decimal DocRate { get; set; }
        public DateTime CreateDate { get; set; }
        public string DocumentNo { get; set; }
        public DocumentTypeRGSL DocumentTypeId { get; set; }

        /// <summary>
        /// Make memberwise clone
        /// </summary>
        public AllocationRGSL Clone()
        {
            var result = (AllocationRGSL) MemberwiseClone();
            return result;
        }
    }
}
