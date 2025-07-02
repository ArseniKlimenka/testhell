using Adacta.AdInsure.Accounting.API.Shared.Constants;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Periods;
using Adacta.AdInsure.RGSL.Accounting.Domain.Periods;
using Adacta.AdInsure.RGSL.Accounting.Domain.Periods.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.Periods.Queries;
using Adacta.AdInsure.RGSL.Common.Domain;
using NPoco;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.Periods.Repositories
{
    public class AccountingPeriodRepositoryRgsl : IAccountingPeriodRepositoryRgsl
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public AccountingPeriodRepositoryRgsl(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public PeriodRgsl Fetch(DateTime? postingDate, PeriodTypeIds periodTypeId)
        {
            string sql = AccountingPeriodQueriesRgsl.SelectFirstOpen();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql);

            builder.Where("PERIOD_TYPE_ID = @0", (int) periodTypeId);
            builder.Where("PERIOD_STATUS_ID = @0", (int) PeriodStatusConsts.Open);

            if (postingDate.HasValue)
            {
                builder.Where("START_DATE <= @0 and END_DATE >= @0", postingDate.Value);
            }

            using var db = _databaseFactory.CreateDatabase();
            var result = db.Fetch<PeriodRgsl>(template);
            return result.SingleOrDefault();
        }

        public PeriodRgsl GetPeriodHasOpenedBefore(List<long> periodIds)
        {
            string sql = AccountingPeriodQueriesRgsl.PeriodHasOpenedBefore();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql);

            builder.WhereNamed("inner", "PERIOD_ID not in (@0)", periodIds);
            builder.WhereNamed("outer", "p.PERIOD_ID in (@0)", periodIds);

            using var db = _databaseFactory.CreateDatabase();
            var result = db.Fetch<PeriodRgsl>(template);
            return result.SingleOrDefault();
        }

        public PeriodRgsl GetPeriodHasClosedAfter(List<long> periodIds)
        {
            string sql = AccountingPeriodQueriesRgsl.PeriodHasClosedAfter();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql);

            builder.WhereNamed("inner", "PERIOD_ID not in (@0)", periodIds);
            builder.WhereNamed("outer", "p.PERIOD_ID in (@0)", periodIds);

            using var db = _databaseFactory.CreateDatabase();
            var result = db.Fetch<PeriodRgsl>(template);
            return result.SingleOrDefault();
        }

        public void SetStatus(SetPeriodStatusRequest request)
        {
            var obj = new
            {
                PeriodId = request.PeriodId,
                PeriodStatusId = request.NewStatus,
            };

            using var db = _databaseFactory.CreateDatabase();

            int resp = db.Execute(AccountingPeriodQueriesRgsl.UpdateStatus(), obj);
            RepositoryHelper.CheckRowUpdatedResult(resp);
        }

        public void InsertPeriodHistory(PeriodHistory history)
        {
            using var db = _databaseFactory.CreateDatabase();

            string sql = AccountingPeriodQueriesRgsl.InsertPeriodHistory();
            db.Insert(sql, history);
        }

    }
}
