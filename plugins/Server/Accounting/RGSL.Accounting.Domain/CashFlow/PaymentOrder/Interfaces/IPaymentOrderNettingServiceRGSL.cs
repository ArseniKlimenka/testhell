using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.PaymentOrder;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.Interfaces
{
    public interface IPaymentOrderNettingServiceRGSL
    {
        Task<NettingResponse> ExecutePaymentOrderNetting(NettingRequest request);
    }
}
