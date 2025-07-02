using Adacta.AdInsure.Organisation.Domain.OrganisationUnit.DataAccess;
using Adacta.AdInsure.Organisation.Domain.OrganisationUnit.Models;
using Adacta.AdInsure.RGSL.ORG.Infrastructure.OrganisationUnit.Queries;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.ORG.Infrastructure.OrganisationUnit.Repositories
{
    public class OrganisationUnitDalRepository : IOrganisationUnitDal
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public OrganisationUnitDalRepository(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        /// <summary>
        /// Get list of subordinate organisation units of given organisation unit.
        /// </summary>
        public IList<string> GetSubordinateOrganisationUnits(string rootOrganisationUnitCode)
        {
            using var db = _databaseFactory.CreateDatabase();
            var subordinateOrganisationUnits = db.Fetch<string>(OrganisationUnitDalQueries.Select_SubordinateOrganisationUnitCodesByRootOrganisationUnitCode(), new { rootOrganisationUnitCode });
            return subordinateOrganisationUnits ?? new List<string>();
        }

        public IList<OrganisationUnitInfo> GetOrganisationUnitsByServiceProvider(string serviceProviderCode, string serviceProviderType)
        {
            using var db = _databaseFactory.CreateDatabase();
            var items = db.Fetch<OrganisationUnitInfo>(OrganisationUnitDalQueries.Select_OrganisationUnitHistoryForServiceProvider(), new { serviceProviderCode, serviceProviderType });
            return items;
        }
    }
}
