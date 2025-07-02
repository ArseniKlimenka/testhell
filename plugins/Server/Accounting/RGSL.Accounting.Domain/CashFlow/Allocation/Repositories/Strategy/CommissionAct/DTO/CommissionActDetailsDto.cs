namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.CommissionAct.DTO
{
    public class CommissionActDetailsDto
    {
        public string StateCode { get; set; }
        public string CurrencyCode { get; set; }
        public decimal Amount { get; set; }
        public decimal OpenAmount { get; set; }
    }
}
