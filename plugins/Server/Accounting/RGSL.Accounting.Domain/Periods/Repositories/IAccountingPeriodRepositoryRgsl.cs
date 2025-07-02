using System;
using System.Collections.Generic;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Periods;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Periods.Repositories
{
    public interface IAccountingPeriodRepositoryRgsl
    {
        PeriodRgsl Fetch(DateTime? postingDate, PeriodTypeIds periodTypeId);
        PeriodRgsl GetPeriodHasOpenedBefore(List<long> perionIds);
        PeriodRgsl GetPeriodHasClosedAfter(List<long> perionIds);
        void SetStatus(SetPeriodStatusRequest request);
        void InsertPeriodHistory(PeriodHistory history);
    }
}
