using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Responses;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Services
{
    public interface IAutoAllocationServiceAppRGSL
    {
        Task<AutoAllocateResponse> AutoAllocate(AutoAllocateRequest request);
    }
}
