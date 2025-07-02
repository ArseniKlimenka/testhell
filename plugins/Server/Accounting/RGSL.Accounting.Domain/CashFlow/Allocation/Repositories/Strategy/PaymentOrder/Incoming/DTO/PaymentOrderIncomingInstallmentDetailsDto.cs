namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.PaymentOrder.Incoming.DTO
{
    public class PaymentOrderIncomingInstallmentDetailsDto
    {
        public string CurrencyCode { get; set; }
        public decimal Amount { get; set; }
        public decimal OpenAmount { get; set; }
    }
}
