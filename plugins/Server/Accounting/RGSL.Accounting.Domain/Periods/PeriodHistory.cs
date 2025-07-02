using Adacta.AdInsure.Framework.Core.ApplicationContext;
using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Periods
{
    public class PeriodHistory
    {
        public long? PeriodHistoryId { get; set; }
        public long PeriodId { get; set; }
        public int PeriodStatusIdTo { get; set; }
        public DateTime CreateDate { get; set; }
        public Guid UserId { get; set; }

        public PeriodHistory()
        {
            CreateDate = DateTime.UtcNow;
            UserId = ApplicationContext.OriginatingUser.Id;
        }
    }
}