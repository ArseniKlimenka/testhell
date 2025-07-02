using Adacta.AdInsure.Framework.Core.Ioc;
using Adacta.AdInsure.RGSL.ORG.API.Shared.ApplicationUser.Services;
using Adacta.AdInsure.RGSL.ORG.API.Shared.Commission.Services;
using Adacta.AdInsure.RGSL.ORG.ApplicationServices.Shared.ServiceProvider.Services;

namespace Adacta.AdInsure.RGSL.ORG.ApplicationServices
{
    public class RgslOrgApplicationServiceComponent : IocComponent
    {
        /// <summary>
        /// Configure bindings.
        /// </summary>
        public override void Configure()
        {
            Bind<IApplicationUserAppService>().To<ApplicationUserAppService>().InSingletonScope();
            Bind<IServiceProviderServiceApp>().To<ServiceProviderServiceApp>().InSingletonScope();
        }

        /// <summary>
        /// Initialize dependencies which require a configured object graph.
        /// </summary>
        public override void Initialize()
        {
        }

    }
}
