using System.Threading.Tasks;
using Adacta.AdInsure.Accounting.APIInternal.PaymentOrders.Services;
using Adacta.AdInsure.Framework.Core.ApplicationContext;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.PaymentOrder.Requests;
using Microsoft.AspNetCore.Mvc;
using RoutePrefix = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Adacta.AdInsure.RGSL.Accounting.WebAPI
{
    [RoutePrefix("api/rgsl/accounting/shared/payment-order/tools")]
    public class PaymentOrderServiceRGSLController : AIApiController
    {
        private readonly IPaymentOrderService _paymentOrderService;

        public PaymentOrderServiceRGSLController(IPaymentOrderService paymentOrderService) : base()
        {
            _paymentOrderService = paymentOrderService;
        }

        [Route("make-transition")]
        [HttpPost]
        public async Task MakeTransition(MakeTransitionRequest request)
        {
            var options = new ImpersonationOptions(SpecialUsersConsts.SystemUserId, Common.API.Constants.Actor.System);
            using var impersonation = new ApplicationContextImpersonation(options);

            await _paymentOrderService.MakeTransitionAsync("PaymentOrder", "1", request.DocumentNo, request.TransitionName, true, new JsonObject("{}"));
        }
    }
}
