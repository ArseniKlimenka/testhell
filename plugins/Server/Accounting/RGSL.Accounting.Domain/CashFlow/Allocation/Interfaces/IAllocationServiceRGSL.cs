using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Responses;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Responses;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces
{
    public interface IAllocationServiceRGSL
    {
        Task<AllocateResponse> Allocate(AllocateRequest request);

        Task<AllocationCancelResponse> Cancel(AllocationCancelRequest request);
    }
}
