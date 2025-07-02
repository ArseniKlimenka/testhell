using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.Registry;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.Registry.DTO;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Queries.Strategy;
using NPoco;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Repositories.Strategy
{
    public class RegistryAllocationStrategyRepositoryRGSL : IRegistryAllocationStrategyRepository
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public RegistryAllocationStrategyRepositoryRGSL(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public IList<RegistryDetailsDto> GetRegistryDetails(string documentNo)
        {
            string sql = RegistryAllocationStrategyQueries.Select_RegistryDetails();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql, documentNo, DocumentTypeRGSL.Registry);

            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<RegistryDetailsDto>(template);
        }
    }
}
