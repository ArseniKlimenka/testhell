using Adacta.AdInsure.Framework.Core.Domain.Common;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.PaymentOrder.Services
{
    public interface IPaymentOrderNettingAppServiceRGSL
    {
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        Task<NettingResponse> ExecutePaymentOrderNetting(NettingRequest request);
    }
}
