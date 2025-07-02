using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces
{
    public interface IMatchingServiceRGSL
    {
        void Match(long allocationId, Guid businessEventId);
        void Cancel(long allocationId, Guid businessEventId);
    }
}
