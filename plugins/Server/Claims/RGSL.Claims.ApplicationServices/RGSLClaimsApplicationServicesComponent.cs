using Adacta.AdInsure.Framework.Core.AutoMapperConfiguration;
using Adacta.AdInsure.Framework.Core.Ioc;
using Adacta.AdInsure.RGSL.Claims.API.Internal.Services;
using Adacta.AdInsure.RGSL.Claims.ApplicationServices.Internal.Converters;
using Adacta.AdInsure.RGSL.Claims.ApplicationServices.Internal.Services;

namespace Adacta.AdInsure.RGSL.Claims.ApplicationServices
{
    public class RGSLClaimsApplicationServicesComponent : IocComponent
    {
        /// <summary>
        /// Configure bindings.
        /// </summary>
        public override void Configure()
        {
            Bind<IEndowmentCalcServiceExecutor>().To<EndowmentCalcServiceExecutor>().InSingletonScope();
            Bind<IAutoMapperConfiguration>().To<CollectiveClaimMapping>().InSingletonScope();
            Bind<ICollectiveClaimService>().To<CollectiveClaimService>().InSingletonScope();
            Bind<ICollectiveClaimPOServiceExecutor>().To<CollectiveClaimPOServiceExecutor>().InSingletonScope();   
        }

        /// <summary>
        /// Initialize dependencies which require a configured object graph.
        /// </summary>
        public override void Initialize()
        {
        }
    }
}
