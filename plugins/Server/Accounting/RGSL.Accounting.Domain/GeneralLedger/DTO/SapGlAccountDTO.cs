namespace Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.DTO
{
    public class SapGlAccountDTO
    {
        public int SapGlAccountId { get; set; }

        public string SapGlAccountNo { get; set; }

        public string Description { get; set; }

        public long AttributeSetId { get; set; }
    }
}
