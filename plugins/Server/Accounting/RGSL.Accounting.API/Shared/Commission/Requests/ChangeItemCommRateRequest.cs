using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests
{
    public class ChangeItemCommRateRequest
    {
        public IList<long> ActItemIds { get; set; }
        public DateTime? LastUpdated { get; set; }
        public decimal? CommRateManual { get; set; }
        public decimal? LcCommAmountManual { get; set; }
    }
}
