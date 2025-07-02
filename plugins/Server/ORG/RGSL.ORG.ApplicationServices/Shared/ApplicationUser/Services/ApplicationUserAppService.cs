using System;
using Adacta.AdInsure.Organisation.API.Public.Users.Services;
using Adacta.AdInsure.RGSL.ORG.API.Shared.ApplicationUser.Requests;
using Adacta.AdInsure.RGSL.ORG.API.Shared.ApplicationUser.Services;
using Adacta.AdInsure.RGSL.ORG.Domain.ApplicationUser.Repositories;

namespace Adacta.AdInsure.RGSL.ORG.ApplicationServices.Shared.ServiceProvider.Services
{
    public class ApplicationUserAppService : IApplicationUserAppService
    {
        private readonly IUserManagementService _userManagementService;
        private readonly IApplicationUserAppRepository _repository;

        public ApplicationUserAppService(
            IUserManagementService userManagementService,
            IApplicationUserAppRepository repository)
        {
            _userManagementService = userManagementService;
            _repository = repository;
        }

        public void CleanupUserMigration(ApplicationUserCleanupMigrationRequest request)
        {
            _ = request.Username ?? throw new ArgumentException(nameof(request.Username));
            _ = request.ExternalId ?? throw new ArgumentException(nameof(request.ExternalId));

            _repository.CleanupUserMigration(request.Username, request.ExternalId);
        }
    }
}
