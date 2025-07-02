using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Responses;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using RoutePrefix = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Adacta.AdInsure.Accounting.WebAPI
{
    /// <summary>
    /// Controller that implements public <see cref="IAutoAllocationServiceAppRGSL"/>.
    /// </summary>
    [RoutePrefix("api/rgsl/accounting/shared/cash-flow/auto-allocation")]
    public class AutoAllocationServiceRGSLController : AIApiController, IAutoAllocationServiceAppRGSL
    {
        private readonly IAutoAllocationServiceAppRGSL _service;

        /// <summary>
        /// Constructor
        /// </summary>
        public AutoAllocationServiceRGSLController(IAutoAllocationServiceAppRGSL service) : base() => _service = service;

        [Route("auto-allocate")]
        [HttpPost]
        public async Task<AutoAllocateResponse> AutoAllocate(AutoAllocateRequest request) => await _service.AutoAllocate(request);
    }
}
