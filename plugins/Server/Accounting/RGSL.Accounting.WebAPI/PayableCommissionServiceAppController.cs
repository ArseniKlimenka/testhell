using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Services;
using Microsoft.AspNetCore.Mvc;
using RoutePrefix = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Adacta.AdInsure.Accounting.WebAPI
{
    [RoutePrefix("api/rgsl/accounting/shared/commission/payable-commission")]
    public class PayableCommissionServiceAppController : AIApiController, IPayableCommissionServiceApp
    {
        private readonly IPayableCommissionServiceApp _service;

        public PayableCommissionServiceAppController(IPayableCommissionServiceApp service) : base() => _service = service;

        [Route("repost")]
        [HttpPost]
        public void Repost(PayableCommissionRepostRequest request) => _service.Repost(request);
    }
}
