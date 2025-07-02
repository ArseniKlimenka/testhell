namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.PaymentOrder.Outgoing.DTO
{
    public class PaymentOrderOutgoingInstallmentDetailsDto
    {
        public string DocumentNo { get; internal set; }
        public string StateCode { get; set; }
        public string CurrencyCode { get; set; }
        public decimal Amount { get; set; }
        public decimal OpenAmount { get; set; }
        public bool NonAcceptance { get; set; }
    }
}
