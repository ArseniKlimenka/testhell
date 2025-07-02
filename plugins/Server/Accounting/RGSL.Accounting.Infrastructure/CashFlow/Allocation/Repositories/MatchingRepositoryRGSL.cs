using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Queries;
using Adacta.AdInsure.RGSL.Common.Domain;
using NPoco;
using System;
using System.Collections.Generic;
using System.Globalization;

namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Repositories
{
    public class MatchingRepositoryRGSL : IMatchingRepositoryRGSL
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public MatchingRepositoryRGSL(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public void CreateMatching(MatchingRGSL matching)
        {
            string sql = MatchingQueriesRGSL.CreateMatching();

            using var db = _databaseFactory.CreateDatabase();
            // Insert a matching and get its generated id
            var id = db.Insert(sql, "MATCHING_ID", (object) matching);
            matching.MatchingId = Convert.ToInt64(id, CultureInfo.InvariantCulture);
        }

        public IList<MatchingRGSL> GetMatchings(GetMatchingRequest request)
        {
            string sql = MatchingQueriesRGSL.GetMatching();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql);
            bool criteriaDefined = false;

            if (request.AllocationId.HasValue)
            {
                builder.Where("mat.allocation_id = @0", request.AllocationId.Value);
                criteriaDefined = true;
            }

            if (request.MatchingIds != null)
            {
                builder.Where("mat.MATCHING_ID in (@0)", request.MatchingIds);
                criteriaDefined = true;
            }

            if (request.NoCancelations)
            {
                builder.Where("(mat.CANCELLED = 0 and mat.CANCELLED_MATCHING_ID is null)");
            }

            RepositoryHelper.ValidateCriteria(criteriaDefined);
            using var db = _databaseFactory.CreateDatabase();
            var matchings = db.Fetch<MatchingRGSL>(template);
            return matchings;
        }

        public void SetCancelled(long matchingId)
        {
            using var db = _databaseFactory.CreateDatabase();
            var resp = db.Execute("update acc_impl.matching set cancelled = 1 where matching_id = @0", matchingId);
            RepositoryHelper.CheckRowUpdatedResult(resp);
        }

        public void SetMatchingPosted(IList<long> matchingIds)
        {
            using var db = _databaseFactory.CreateDatabase();
            var resp = db.Execute("update acc_impl.matching_policy set is_posted = 1 where matching_id in (@0)", matchingIds);
            RepositoryHelper.CheckRowUpdatedResult(resp, matchingIds.Count);
        }
    }
}
