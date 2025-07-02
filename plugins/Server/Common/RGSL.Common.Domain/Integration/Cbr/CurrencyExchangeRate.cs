using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr
{
    public class CurrencyExchangeRate
    {
        public string CurrencyNumericCode { get; set; }
        public int ExchangeRateType { get; set; }
        public DateTime ExchangeRateDate { get; set; }
        public string CurrencyCode { get; set; }
        public decimal ExchangeRate { get; set; }
        public DateTime ModifiedAt { get; set; }
        public int Unit { get; set; }
    }
}
