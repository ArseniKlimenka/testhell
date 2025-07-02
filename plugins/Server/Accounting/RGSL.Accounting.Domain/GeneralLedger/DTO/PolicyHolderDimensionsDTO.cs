namespace Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.DTO
{
    public class PolicyHolderDimensionsDTO
    {
        public string ContractNumber { get; set; }
        public string PartyCode { get; set; }
        public string PartnerCode { get; set; }
        public string InitiatorEmployeeCode { get; set; }
        public decimal? ExchangeRate { get; set; }
    }
}
