using NPoco;
using System;

namespace Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit.DTO
{
    [TableName("PAS_IMPL.INVESTMENT_PROFIT")]
    [PrimaryKey("INV_PROFIT_ROW_ID", AutoIncrement = false)]
    public class InvestmentProfitRecordDomainDTO
    {
        [Column("INV_PROFIT_ROW_ID")]
        public Guid RecordId { get; set; }

        [Column("IMPORT_DOCUMENT_ID")]
        public Guid ImportDocumentId { get; set; }

        [Column("CONTRACT_NUMBER")]
        public string ContractNumber { get; set; }

        [Column("INV_PROFIT_CALC_DATE")]
        public DateTime CalculationDate { get; set; }

        [Column("INV_PROFIT_RATE")]
        public decimal Rate { get; set; }

        [Column("INV_PROFIT_PAY_TYPE_CODE")]
        public int PaymentTypeCode { get; set; }

        [Column("LOAD_DATE")]
        public DateTime LoadDate { get; set; }
    }
}
