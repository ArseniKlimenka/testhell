using Adacta.AdInsure.RGSL.Common.Domain;
using Adacta.AdInsure.RGSL.ORG.Domain.ApplicationUser.Repositories;

namespace Adacta.AdInsure.RGSL.ORG.Infrastructure.OrganisationUnit.Repositories
{
    public class ApplicationUserAppRepository : IApplicationUserAppRepository
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public ApplicationUserAppRepository(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public void CleanupUserMigration(string username, string externalId)
        {
            string query = @"update ORG.APPLICATION_USER
set LOGIN_TYPE = 'SCIM', PASSWORD_HASH = null, PASSWORD_SALT = null, EXTERNAL_ID = @1
where USERNAME = @0";

            using var db = _databaseFactory.CreateDatabase();
            var resp = db.Execute(query, username, externalId);
            RepositoryHelper.CheckRowUpdatedResult(resp);
        }
    }
}
