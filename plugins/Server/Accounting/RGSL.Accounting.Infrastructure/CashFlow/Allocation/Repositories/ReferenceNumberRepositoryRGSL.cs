using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories;

namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Repositories
{
    public class ReferenceNumberRepositoryRGSL : IReferenceNumberRepositoryRGSL
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public ReferenceNumberRepositoryRGSL(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public ReferenceNumber GetRef(string referenceNo)
        {
            string sql = "select document_no, document_type_id from acc_impl.REFERENCE_NUMBER where reference_no = @0";

            using var db = _databaseFactory.CreateDatabase();
            return db.SingleOrDefault<ReferenceNumber>(sql, referenceNo);
        }
    }
}
