using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services.Strategy.Policy
{
    public class PolicyMatchingRGSL
    {
        public long? MatchingId { get; set; }
        public string ObjectCode { get; set; }
        public string SourceLineId { get; set; }
        public bool IsLife { get; set; }
        public bool IsAdvancePayment { get; set; }
        public decimal PostAmount { get; set; }
        public bool IsPosted { get; set; }
        public DateTime PostingDate { get; set; }

        /// <summary>
        /// Make memberwise clone
        /// </summary>
        public PolicyMatchingRGSL Clone()
        {
            var result = (PolicyMatchingRGSL) MemberwiseClone();
            return result;
        }
    }
}