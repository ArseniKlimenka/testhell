using Adacta.AdInsure.RGSL.Common.Domain;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Commission;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Commission.Responses;
using Adacta.AdInsure.RGSL.PAS.Domain.Commission.Repositories;
using Adacta.AdInsure.RGSL.PAS.Infrastructure.Commission.Queries;
using NPoco;

namespace Adacta.AdInsure.RGSL.PAS.Infrastructure.Commission.Repositories
{
    public class PolicyCommissionRepository : IPolicyCommissionRepository
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public PolicyCommissionRepository(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public GetPolicyCommissionResponse GetPolicyCommission(GetPolicyCommissionRequest request)
        {
            string sql = PolicyCommissionQueries.SelectPolicyCommissionItems();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql);
            bool criteriaDefined = false;

            if (request.ContractNumber != null)
            {
                builder.Where("polh.CONTRACT_NUMBER = @0", request.ContractNumber);
                criteriaDefined = true;
            }

            if (request.DueDate.HasValue)
            {
                builder.Where("@0 between pcsl.START_DATE and pcsl.END_DATE", request.DueDate.Value);
            }

            RepositoryHelper.ValidateCriteria(criteriaDefined);

            using var db = _databaseFactory.CreateDatabase();
            var items = db.Fetch<PolicyCommissionItem>(template);
            return new GetPolicyCommissionResponse { Items = items };
        }
    }
}
