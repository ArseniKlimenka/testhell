namespace Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.DTO
{
    public class TransactionDefinitionStep
    {
        public string TransactionDefinitionNo { get; set; }
        public long GlAccountId { get; set; }
        public bool IsDebit { get; set; }
        public long? AttributeSetId { get; set; }
        public int Sign { get; set; }
        public int PairNo { get; set; }
        public int PairSeqNo { get; set; }
    }
}
