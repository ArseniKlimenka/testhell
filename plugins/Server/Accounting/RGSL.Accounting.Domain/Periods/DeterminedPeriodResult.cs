using System;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Periods;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Periods
{
    public class DeterminedPeriodResult
    {
        public PeriodRgsl Period { get; set; }
        public DateTime PostingDate { get; set; }
    }
}
