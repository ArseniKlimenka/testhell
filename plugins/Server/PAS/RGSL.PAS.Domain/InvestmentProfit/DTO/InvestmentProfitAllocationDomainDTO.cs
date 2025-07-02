using NPoco;
using System;

namespace Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit.DTO
{
    [TableName("PAS_IMPL.INVEST_PROFIT_ALLOCATION")]
    [PrimaryKey("ALLOCATION_ID", AutoIncrement = false)]
    public class InvestmentProfitAllocationDomainDTO
    {
        [Column("ALLOCATION_ID")]
        public Guid AllocationId { get; set; }

        [Column("INV_PROFIT_ROW_ID")]
        public Guid RecordId { get; set; }

        [Column("REFERENCE_NUMBER")]
        public string ReferenceNumber { get; set; }

        [Column("REFERENCE_CONF")]
        public string ReferenceConfiguration { get; set; }

        [Column("IS_CANCELLED")]
        public bool IsCancelled { get; set; }

        [Column("IS_PAID")]
        public bool IsPaid { get; set; }

        [Column("LOAD_DATE")]
        public DateTime LoadDate { get; set; }
    }
}
