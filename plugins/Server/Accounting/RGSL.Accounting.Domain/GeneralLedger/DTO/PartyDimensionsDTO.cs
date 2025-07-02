namespace Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.DTO
{
    public class PartyDimensionsDTO
    {
        //Party code
        public string PartyCode { get; set; }

        //Trading partner code (if provided)
        public int? TradingPartnerCode { get; set; }

        //Party type (configuration code name)
        public string PartyType { get; set; }
    }
}
