namespace Adacta.AdInsure.RGSL.Accounting.Domain.Periods
{
    public class SetPeriodStatusRequest
    {
        public long PeriodId { get; set; }
        public int NewStatus { get; set; }
    }
}
