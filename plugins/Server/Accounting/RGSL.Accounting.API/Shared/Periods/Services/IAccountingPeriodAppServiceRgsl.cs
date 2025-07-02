using Adacta.AdInsure.Framework.Core.Domain.Common;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Periods.Services
{
    public interface IAccountingPeriodAppServiceRgsl
    {
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void ClosePeriod(AccountingPeriodAppRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void ReopenPeriod(AccountingPeriodAppRequest request);
    }
}
