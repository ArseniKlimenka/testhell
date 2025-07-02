using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Commission
{
    public class PayableCommission
    {
        public long? PayableCommissionId { get; set; }
        public long MatchingId { get; set; }
        public bool Cancelled { get; set; }
        public long? CancelledPcId { get; set; }
        public DateTime CreateDate { get; set; }

        public string PolicyCommissionHkey { get; set; }
        public string ObjectCode { get; set; }
        public string ItemCode { get; set; }
        public int PeriodNumber { get; set; }

        public decimal DocBaseAmount { get; set; }
        public bool IsMigrated { get; set; }

        /// <summary>
        /// Make memberwise clone
        /// </summary>
        public PayableCommission Clone()
        {
            var result = (PayableCommission) MemberwiseClone();
            return result;
        }
    }
}
