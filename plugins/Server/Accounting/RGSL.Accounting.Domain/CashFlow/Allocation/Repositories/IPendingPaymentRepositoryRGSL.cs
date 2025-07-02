using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories
{
    public interface IPendingPaymentRepositoryRGSL
    {
        IList<long> GetMatchingIdsToPost(string referenceNo);
    }
}
