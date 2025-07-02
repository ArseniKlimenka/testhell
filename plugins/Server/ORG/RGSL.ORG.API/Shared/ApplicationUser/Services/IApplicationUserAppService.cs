using Adacta.AdInsure.RGSL.ORG.API.Shared.ApplicationUser.Requests;

namespace Adacta.AdInsure.RGSL.ORG.API.Shared.ApplicationUser.Services
{
    public interface IApplicationUserAppService
    {
        void CleanupUserMigration(ApplicationUserCleanupMigrationRequest request);
    }
}
