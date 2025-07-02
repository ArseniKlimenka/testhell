using System.Collections.Generic;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Responses;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.Commission.Queries;
using Adacta.AdInsure.RGSL.Common.Domain;

namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.Commission.Repositories
{
    public class InvoicedCommissionRepository : IInvoicedCommissionRepository
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public InvoicedCommissionRepository(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public InvoicedCommissionResponse GetInvoicedCommission(List<InvoicedCommissionRequest> invoicedCommissionRequest)
        {
            using var db = _databaseFactory.CreateDatabase();

            string table = "#INV_COMM_REQUEST_FILTER";
            db.Execute(InvoicedCommissionQueries.DeclareInvCommRequestFilter(table));

            string sql = InvoicedCommissionQueries.InsertInvCommRequestFilter(table);
            RepositoryHelper.BulkInsert(db, sql, invoicedCommissionRequest);

            var ics = db.Fetch<InvoicedCommissionItem>(InvoicedCommissionQueries.SelectInvCommFromRequestFilter(table));

            db.Execute($"drop table {table}");

            return new InvoicedCommissionResponse
            {
                Items = ics,
            };
        }
    }
}
