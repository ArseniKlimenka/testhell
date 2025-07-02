namespace Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.DTO
{
    public class TransactionTypeDTO
    {
        public int TransactionTypeId { get; set; }

        public string Description { get; set; }

        public int TransactionDocumentTypeId { get; set; }

        public int LocalDimension3Id { get; set; }
    }
}
