namespace Adacta.AdInsure.RGSL.ORG.Domain.ApplicationUser.Repositories
{
    public interface IApplicationUserAppRepository
    {
        void CleanupUserMigration(string username, string externalId);
    }
}
