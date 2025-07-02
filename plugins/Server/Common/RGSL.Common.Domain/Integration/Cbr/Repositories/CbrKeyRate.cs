using System;
using NPoco;

namespace Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Repositories
{

    [TableName("BFX_IMPL.BANK_KEY_RATE")]
    public class CbrKeyRate
    {
        [Column("RATE_DATE")]
        public DateTime RateDate { get; set; }

        [Column("RATE")]
        public float Rate { get; set; }
    }
}
