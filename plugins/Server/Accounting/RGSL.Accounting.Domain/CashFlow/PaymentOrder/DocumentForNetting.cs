using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder
{
    public class DocumentForNetting
    {
		public string PaymentOrderNo { get; set; }

		public string DocumentNo { get; set; }

		public string DocumentCurrency { get; set; }

		public decimal InitialOpenAmount { get; set; }

		public decimal ExchangeRate { get; set; }

		public decimal NettedAmount { get; set; }

		public decimal NettedAmountInDocCurrency { get; set; }

		public long BankStatementId { get; set; }

        public bool IsFutureContract { get; set; }

        public string PaymentCurrency { get; set; }

        public DateTime PaymentOrderDate { get; set; }

		public string PayerBankAccountNo { get; set; }

		public string RecipientFullName { get; set; }
    }
}