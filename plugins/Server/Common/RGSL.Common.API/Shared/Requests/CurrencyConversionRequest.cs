using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Requests
{
    public class CurrencyConversionRequest
    {
        public decimal Amount { get; set; }
        public string FromCurrencyCode { get; set; }
        public string ToCurrencyCode { get; set; }
        public DateTime? AtDate { get; set; }
    }
}
