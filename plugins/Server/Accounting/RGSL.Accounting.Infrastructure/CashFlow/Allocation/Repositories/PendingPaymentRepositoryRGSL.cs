using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Queries;
using NPoco;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Repositories
{
    public class PendingPaymentRepositoryRGSL : IPendingPaymentRepositoryRGSL
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public PendingPaymentRepositoryRGSL(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public IList<long> GetMatchingIdsToPost(string documentNo)
        {
            string sql = PendingPaymentQueriesRGSL.GetMatchingIdsToPost();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql);

            builder.Where("alc.document_no = @0", documentNo);

            using var db = _databaseFactory.CreateDatabase();
            var ids = db.Fetch<long>(template);
            return ids;
        }
    }
}
