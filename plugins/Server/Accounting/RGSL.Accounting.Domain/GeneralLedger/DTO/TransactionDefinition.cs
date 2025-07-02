namespace Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.DTO
{
    public class TransactionDefinition
    {
        public string TransactionDefinitionNo { get; set; }
        public int TransactionTypeId { get; set; }
        public int DocumentTypeId { get; set; }
        public int Sign { get; set; }
        public bool IsPreviousPeriod { get; set; }
        public bool IsLife { get; set; }
        public string AgentType { get; set; }
    }
}
