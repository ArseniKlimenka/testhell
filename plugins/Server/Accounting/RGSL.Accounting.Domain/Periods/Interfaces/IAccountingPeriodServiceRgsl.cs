using Adacta.AdInsure.RGSL.Accounting.API.Shared.Periods;
using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Periods.Interfaces
{
    public interface IAccountingPeriodServiceRgsl
    {
        void ClosePeriod(AccountingPeriodAppRequest request);
        void ReopenPeriod(AccountingPeriodAppRequest request);
        DeterminedPeriodResult DeterminePostingDate(DateTime? postingDate, DateTime proposedPostingDate, PeriodTypeIds periodTypeId);
    }
}
