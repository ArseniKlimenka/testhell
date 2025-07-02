using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission
{
    public class CommissionAct
    {
        public long? ActId { get; set; }
        public string ActNo { get; set; }
        public DateTime? LastUpdated { get; set; }
        public DateTime IssueDate { get; set; }
        public DateTime? PayDate { get; set; }
        public DateTime? OriginalReceiptDate { get; set; }
        public CommissionActTypeIds ActTypeId { get; set; }
        public string StateCode { get; set; }
        public string AgentServiceProviderCode { get; set; }
        public string AgentAgreementNumber { get; set; }
        public string HistoricalAgentAgreement { get; set; }

        public string ProductGroupInclude { get; set; }
        public IList<string> ProductsInclude { get; set; }
        public string ProductGroupExclude { get; set; }
        public IList<string> ProductsExclude { get; set; }

        public DateTime? PeriodFrom { get; set; }
        public DateTime PeriodTo { get; set; }
        public DateTime ReportingPeriodFrom { get; set; }
        public DateTime ReportingPeriodTo { get; set; }

        public decimal PremiumAmountLc { get; set; }
        public decimal CommAmountLc { get; set; }
        public decimal VatRate { get; set; }
        public decimal VatAmountLc { get; set; }
        public int ItemsCount { get; set; }
        public string Notes { get; set; }
        public bool IsDocCorrect { get; set; }
    }
}
