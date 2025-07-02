using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Queries;

namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Repositories
{
    public class AccountNumberRepositoryRGSL : IAccountNumberRepositoryRGSL
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public AccountNumberRepositoryRGSL(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public string GetAccountDefaultDataAccountNumber()
        {
            string sql = AccountNumberQueriesRGSL.GetAccountDefaultDataAccountNumber();
            using var db = _databaseFactory.CreateDatabase();
            return db.Single<string>(sql);
        }

        public string GetAccountDefaultIncomingDataAccountNumber()
        {
            string sql = AccountNumberQueriesRGSL.GetAccountDefaultIncomingDataAccountNumber();
            using var db = _databaseFactory.CreateDatabase();
            return db.Single<string>(sql);
        }

        public string GetAccountDefaultOutgoingEndowmentDataAccountNumber()
        {
            string sql = AccountNumberQueriesRGSL.GetAccountDefaultOutgoingEndowmentDataAccountNumber();
            using var db = _databaseFactory.CreateDatabase();
            return db.Single<string>(sql);
        }

        public string GetAccountDefaultRiskDeathDataAccountNumber()
        {
            string sql = AccountNumberQueriesRGSL.GetAccountDefaultRiskDeathDataAccountNumber();
            using var db = _databaseFactory.CreateDatabase();
            return db.Single<string>(sql);
        }
    }
}
