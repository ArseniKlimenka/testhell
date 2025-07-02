namespace Adacta.AdInsure.RGSL.PAS.API.Shared.Commission
{
    public class PolicyCommissionItem
    {
        public string ContractNumber { get; set; }
        public string PolicyCommissionHkey { get; set; }
        public string ObjectCode { get; set; }
        public string ItemCode { get; set; }
        public int PeriodNumber { get; set; }
        public decimal? DocCommRate { get; set; }
    }
}
