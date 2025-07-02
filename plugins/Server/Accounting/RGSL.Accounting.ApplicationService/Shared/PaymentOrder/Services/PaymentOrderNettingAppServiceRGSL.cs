using Adacta.AdInsure.Framework.Core.Transactions;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.PaymentOrder;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.PaymentOrder.Services;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.Interfaces;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Accounting.ApplicationServices.Shared.PaymentOrder.Services
{
    public class PaymentOrderNettingAppServiceRGSL : IPaymentOrderNettingAppServiceRGSL
    {
        private readonly IPaymentOrderNettingServiceRGSL _nettingService;

        public PaymentOrderNettingAppServiceRGSL(IPaymentOrderNettingServiceRGSL nettingService)
        {
            _nettingService = nettingService;
        }

        [Transaction]
        public async Task<NettingResponse> ExecutePaymentOrderNetting(NettingRequest request)
        {
            return await _nettingService.ExecutePaymentOrderNetting(request);
        }
    }
}
