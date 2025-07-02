using Adacta.AdInsure.Framework.Core.Ioc;
using Adacta.AdInsure.Organisation.Domain.OrganisationUnit.DataAccess;
using Adacta.AdInsure.RGSL.ORG.Domain.ApplicationUser.Repositories;
using Adacta.AdInsure.RGSL.ORG.Domain.ServiceProvider.Repositories;
using Adacta.AdInsure.RGSL.ORG.Infrastructure.OrganisationUnit.Repositories;
using Adacta.AdInsure.RGSL.ORG.Infrastructure.ServiceProvider.Repositories;

namespace Adacta.AdInsure.ORG.Infrastructure
{
    public class RgslOrgInfrastructureComponent : IocComponent
    {
        public override void Configure()
        {
            BindRepositories();
        }

        private void BindRepositories()
        {
            Bind<IApplicationUserAppRepository>().To<ApplicationUserAppRepository>().InSingletonScope();
            Bind<IServiceProviderRepository>().To<ServiceProviderRepository>().InSingletonScope();
            Rebind<IOrganisationUnitDal>().To<OrganisationUnitDalRepository>().InSingletonScope();
        }
    }
}