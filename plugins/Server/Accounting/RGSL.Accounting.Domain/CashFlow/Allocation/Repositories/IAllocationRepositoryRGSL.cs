using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories
{
    public interface IAllocationRepositoryRGSL
    {
        void Lock(long bankStatementItemId, string documentNo);
        IList<AllocationRGSL> GetAllocations(GetAllocationsRequest request);
        void CreateAllocation(AllocationRGSL alloc);
        void SetCancelled(long allocationId);
        decimal GetAllocationPayAmount(long bankStatementItemId);
    }
}
