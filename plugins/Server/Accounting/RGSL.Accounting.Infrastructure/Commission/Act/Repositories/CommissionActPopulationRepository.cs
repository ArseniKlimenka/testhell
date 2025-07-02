using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Responses;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.Commission.Act.Queries;
using NPoco;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.Commission.Act.Repositories
{
    public class CommissionActPopulationRepository : ICommissionActPopulationRepository
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public CommissionActPopulationRepository(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public GetContractRisksResponse GetContractRisks(IList<string> contractNumbers)
        {
            string sql = CommissionActPopulationQueries.GetContractRisks();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql);
            builder.Where("CONTRACT_NUMBER in (@0)", contractNumbers);

            using var db = _databaseFactory.CreateDatabase();
            var items = db.Fetch<GetContractRisksResponseItem>(template);

            return new GetContractRisksResponse
            {
                Items = items,
            };
        }
    }
}
