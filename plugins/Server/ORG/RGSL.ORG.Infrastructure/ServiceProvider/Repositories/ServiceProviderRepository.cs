using Adacta.AdInsure.RGSL.Common.Domain;
using Adacta.AdInsure.RGSL.ORG.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.ORG.API.Shared.ServiceProvider;
using Adacta.AdInsure.RGSL.ORG.Domain.ServiceProvider.Repositories;
using Adacta.AdInsure.RGSL.ORG.Infrastructure.ServiceProvider.Queries;
using NPoco;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.ORG.Infrastructure.ServiceProvider.Repositories
{
    public class ServiceProviderRepository : IServiceProviderRepository
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public ServiceProviderRepository(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public IList<ServiceProviderData> Search(ServiceProviderSearchRequest request)
        {
            string sql = ServiceProviderQueries.SelectServiceProvider();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql);
            bool criteriaDefined = false;

            if (request.Code != null)
            {
                builder.Where("sph.SERVICE_PROVIDER_CODE = @0", request.Code);
                criteriaDefined = true;
            }

            RepositoryHelper.ValidateCriteria(criteriaDefined);
            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<ServiceProviderData>(template);
        }
    }
}
