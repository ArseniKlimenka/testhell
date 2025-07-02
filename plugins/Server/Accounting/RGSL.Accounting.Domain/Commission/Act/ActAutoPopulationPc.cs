using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act
{
    public class ActAutoPopulationPc
    {
        public string DocumentNo { get; set; }
        public string DocCurrencyCode { get; set; }
        public DateTime PaymentTransactionDate { get; set; }
        public DateTime InstallmentDueDate { get; set; }
        public string SourceLineId { get; set; }

        public decimal MatchingDocAmount { get; set; }
        public long PayableCommissionId { get; set; }
        public long BankStatementItemId { get; set; }

        public decimal AaCommRate { get; set; }
        public decimal? DocCommRate { get; set; }
        public decimal? ManualCommRate { get; set; }

        public decimal AaExpensesRate { get; set; }
        public decimal AaNaturalPersonRate { get; set; }
        public decimal AaSolePropriatorRate { get; set; }
        public decimal? DocExpensesRate { get; set; }
        public decimal? DocNaturalPersonRate { get; set; }
        public decimal? DocSolePropriatorRate { get; set; }

        public bool IsTechnical { get; set; }
    }
}
