using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Periods;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Periods.Services;
using Microsoft.AspNetCore.Mvc;
using RoutePrefix = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Adacta.AdInsure.RGSL.Accounting.WebAPI
{
    /// <summary>
    /// Controller that implements public <see cref="IAccountingPeriodAppServiceRgsl"/>.
    /// </summary>
    [RoutePrefix("api/rgsl/accounting/shared/periods")]
    public class AccountingPeriodServiceRgslController : AIApiController, IAccountingPeriodAppServiceRgsl
    {
        private readonly IAccountingPeriodAppServiceRgsl _service;

        /// <summary>
        /// Constructor
        /// </summary>
        public AccountingPeriodServiceRgslController(IAccountingPeriodAppServiceRgsl service) : base() => _service = service;

        [Route("close")]
        [HttpPost]
        public void ClosePeriod(AccountingPeriodAppRequest request) => _service.ClosePeriod(request);

        [Route("reopen")]
        [HttpPost]
        public void ReopenPeriod(AccountingPeriodAppRequest request) => _service.ReopenPeriod(request);
    }
}
