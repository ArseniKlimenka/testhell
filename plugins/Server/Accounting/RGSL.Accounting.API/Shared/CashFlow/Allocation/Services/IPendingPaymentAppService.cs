using System.Threading.Tasks;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Responses;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Services
{
    public interface IPendingPaymentAppService
    {
        Task<PendingPaymentCheckAndPostResponse> CheckAndPost(PendingPaymentCheckAndPostRequest request);
    }
}
