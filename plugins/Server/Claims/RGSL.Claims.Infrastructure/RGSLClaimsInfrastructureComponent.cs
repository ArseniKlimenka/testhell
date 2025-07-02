using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Domain.Common;
using RGSL.Claims.Domain.CollectiveClaim.Repositories;
using RGSL.Claims.Infrastructure.CollectiveClaim.Repositories;

namespace RGSL.Claims.Infrastructure
{
    public class RGSLClaimsInfrastructureComponent : DomainIocComponent
    {
        public RGSLClaimsInfrastructureComponent() : base(AdInsureModule.Claims)
        {
        }

        public override void Configure()
        {
            Bind<ICollectiveClaimRepository>().To<CollectiveClaimRepository>().InSingletonScope();
        }
    }
}