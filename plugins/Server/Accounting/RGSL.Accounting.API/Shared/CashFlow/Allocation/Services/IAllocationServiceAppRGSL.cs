using Adacta.AdInsure.Framework.Core.Domain.Common;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Services
{
    public interface IAllocationServiceAppRGSL
    {
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        Task<AllocateResponse> Allocate(AllocateRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        Task<AllocateResponse> AllocateGroup(IList<AllocateRequest> request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        Task Cancel(AllocationCancelAppRequest request);
    }
}
