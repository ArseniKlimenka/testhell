using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories
{
    public interface IMatchingRepositoryRGSL
    {
        void CreateMatching(MatchingRGSL matching);
        IList<MatchingRGSL> GetMatchings(GetMatchingRequest request);
        void SetCancelled(long matchingId);
        void SetMatchingPosted(IList<long> matchingIds);
    }
}
