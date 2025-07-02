namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.DTO
{
    public class PaymentOrderItemDto
    {
        public string ItemType { get; set; }
        public decimal PoCurrencyAmount { get; set; }
        public decimal PaymentCurrencyAmount { get; set; }
    }
}
