using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.PaymentOrder;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.PaymentOrder.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using RoutePrefix = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Adacta.AdInsure.RGSL.Accounting.WebAPI
{
    [RoutePrefix("api/rgsl/accounting/shared/payment-order/netting")]
    public class PaymentOrderNettingServiceRGSLController : AIApiController, IPaymentOrderNettingAppServiceRGSL
    {
        private readonly IPaymentOrderNettingAppServiceRGSL _service;

        public PaymentOrderNettingServiceRGSLController(IPaymentOrderNettingAppServiceRGSL service) : base()
        {
            _service = service;
        }

        [Route("execute")]
        [HttpPost]
        public async Task<NettingResponse> ExecutePaymentOrderNetting(NettingRequest request)
        {
            return await _service.ExecutePaymentOrderNetting(request);
        }
    }
}
