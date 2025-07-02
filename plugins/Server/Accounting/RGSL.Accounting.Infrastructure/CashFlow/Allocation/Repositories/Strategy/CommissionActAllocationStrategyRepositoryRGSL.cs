using System.Collections.Generic;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.CommissionAct;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.CommissionAct.DTO;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Queries.Strategy;
using NPoco;

namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Repositories.Strategy
{
    public class CommissionActAllocationStrategyRepositoryRGSL : ICommissionActAllocationStrategyRepository
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public CommissionActAllocationStrategyRepositoryRGSL(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public IList<CommissionActDetailsDto> GetDocumentDetails(string documentNo)
        {
            string sql = CommissionActAllocationStrategyQueries.Select_CommissionActDetails();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql, documentNo, DocumentTypeRGSL.CommissionAct);

            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<CommissionActDetailsDto>(template);
        }
    }
}
