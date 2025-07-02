using Adacta.AdInsure.RGSL.Accounting.API.Shared.Periods;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Periods.Services;
using Adacta.AdInsure.RGSL.Accounting.Domain.Periods.Interfaces;

namespace Adacta.AdInsure.RGSL.Accounting.ApplicationServices.Shared.Periods.Services
{
    public class AccountingPeriodAppServiceRgsl : IAccountingPeriodAppServiceRgsl
    {
        private readonly IAccountingPeriodServiceRgsl _accountingPeriodServiceRgsl;

        public AccountingPeriodAppServiceRgsl(
            IAccountingPeriodServiceRgsl accountingPeriodServiceRgsl)
        {
            _accountingPeriodServiceRgsl = accountingPeriodServiceRgsl;
        }

        public void ClosePeriod(AccountingPeriodAppRequest request)
        {
            _accountingPeriodServiceRgsl.ClosePeriod(request);
        }

        public void ReopenPeriod(AccountingPeriodAppRequest request)
        {
            _accountingPeriodServiceRgsl.ReopenPeriod(request);
        }
    }
}
