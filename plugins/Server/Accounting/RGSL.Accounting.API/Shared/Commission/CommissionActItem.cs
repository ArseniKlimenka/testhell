using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;
using System;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission
{
    public class CommissionActItem
    {
        public long ActItemId { get; set; }
        public long ActId { get; set; }
        public CommissionActItemStatusId StatusId { get; set; }
        public string ReferenceNo { get; set; }
        public string SourceLineId { get; set; }
        public string DocCurrencyCode { get; set; }
        public DateTime? PaymentTransactionDate { get; set; }
        public DateTime DueDate { get; set; }
        public long? BankStatementItemId { get; set; }
        public decimal InstallmentDocAmount { get; set; }
        public decimal InstallmentLcAmount { get; set; }
        public decimal? PaymentDocAmount { get; set; }
        public decimal? PaymentLcAmount { get; set; }


        public decimal? InvCommFinalRate { get; set; }
        public decimal? InvCommDocAmount { get; set; }
        public decimal? InvCommLcAmount { get; set; }


        public decimal? AaCommRate { get; set; }

        public decimal? DocCommRate { get; set; }

        public decimal? CommRateManual { get; set; }
        public decimal? CommRateCalc { get; set; }
        public decimal? CommRateFinal { get; set; }


        public decimal AaExpensesRate { get; set; }
        public decimal AaNaturalPersonRate { get; set; }
        public decimal AaSolePropriatorRate { get; set; }
        public decimal? DocExpensesRate { get; set; }
        public decimal? DocNaturalPersonRate { get; set; }
        public decimal? DocSolePropriatorRate { get; set; }
        public decimal ExpensesRateFinal { get; set; }
        public decimal NaturalPersonRateFinal { get; set; }
        public decimal SolePropriatorRateFinal { get; set; }
        public decimal ExpensesAmount { get; set; }
        public decimal NaturalPersonAmount { get; set; }
        public decimal SolePropriatorAmount { get; set; }


        public decimal LcCommAmountCalc { get; set; }
        public decimal? LcCommAmountManual { get; set; }
        public decimal? LcCommAmountExtra { get; set; }
        public decimal LcCommAmountFinal { get; set; }
        public decimal LcVatAmount { get; set; }

        public bool IsTechnical { get; set; }
        public string Notes { get; set; }
    }
}
