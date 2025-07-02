using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Responses;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using RoutePrefix = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Adacta.AdInsure.Accounting.WebAPI
{
    /// <summary>
    /// Controller that implements public <see cref="IAllocationServiceAppRGSL"/>.
    /// </summary>
    [RoutePrefix("api/rgsl/accounting/shared/cash-flow/allocation")]
    public class AllocationServiceRGSLController : AIApiController, IAllocationServiceAppRGSL
    {
        private readonly IAllocationServiceAppRGSL _service;

        /// <summary>
        /// Constructor
        /// </summary>
        public AllocationServiceRGSLController(IAllocationServiceAppRGSL service) : base() => _service = service;

        [Route("allocate")]
        [HttpPost]
        public async Task<AllocateResponse> Allocate(AllocateRequest request) => await _service.Allocate(request);

        [Route("allocate-group")]
        [HttpPost]
        public async Task<AllocateResponse> AllocateGroup(IList<AllocateRequest> request) => await _service.AllocateGroup(request);

        [Route("cancel-allocation")]
        [HttpPost]
        public async Task Cancel(AllocationCancelAppRequest request) => await _service.Cancel(request);
    }
}
