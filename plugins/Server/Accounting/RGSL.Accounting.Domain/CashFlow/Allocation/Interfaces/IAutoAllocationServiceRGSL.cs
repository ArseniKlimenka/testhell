using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Responses;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces
{
    public interface IAutoAllocationServiceRGSL
    {
        Task<AutoAllocateResponse> AutoAllocate(AutoAllocateRequest request);
    }
}
