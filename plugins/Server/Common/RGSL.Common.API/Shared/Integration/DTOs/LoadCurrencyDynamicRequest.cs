using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Integration.DTOs
{
    public class LoadCurrencyDynamicRequest
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string CurrencyCode { get; set; }
    }
}
