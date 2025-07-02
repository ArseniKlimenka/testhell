using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation
{
    public class MatchingRGSL
    {
        public long? MatchingId { get; set; }
        public long AllocationId { get; set; }
        public bool Cancelled { get; set; }
        public long? CancelledMatchingId { get; set; }
        public decimal DocAmount { get; set; }
        public decimal ToleranceDocAmount { get; set; }
        public DateTime CreateDate { get; set; }

        /// <summary>
        /// Make memberwise clone
        /// </summary>
        public MatchingRGSL Clone()
        {
            var result = (MatchingRGSL) MemberwiseClone();
            return result;
        }
    }
}
