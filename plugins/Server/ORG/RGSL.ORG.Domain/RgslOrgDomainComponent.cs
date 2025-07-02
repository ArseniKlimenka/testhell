using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Domain.Common;
using Adacta.AdInsure.RGSL.ORG.Domain.ServiceProvider.Interfaces;
using Adacta.AdInsure.RGSL.ORG.Domain.ServiceProvider.Services;

namespace Adacta.AdInsure.RGSL.ORG.Domain
{
    public class RgslOrgDomainComponent : DomainIocComponent
    {
        public RgslOrgDomainComponent() : base(AdInsureModule.Organisation)
        {
        }

        public override void Configure()
        {
            Bind<IServiceProviderService>().To<ServiceProviderService>().InSingletonScope();
        }

        public override void Initialize()
        {
        }
    }
}
