using Adacta.AdInsure.Claims.Domain.Claims.API;
using Adacta.AdInsure.Claims.Domain.Claims.Services;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Domain.Common;
using Adacta.AdInsure.RGSL.Claims.Domain.Services;
using RGSL.Claims.Domain.CollectiveClaim.Interfaces;
using RGSL.Claims.Domain.CollectiveClaim.Services;

namespace RGSL.Claims.Domain
{
    public class RGSLClaimsDomainComponent : DomainIocComponent
    {
        public RGSLClaimsDomainComponent() : base(AdInsureModule.Claims)
        {          
        }

        public override void Configure()
        {
            Bind<ICollectiveClaimDomainService>().To<CollectiveClaimDomainService>().InSingletonScope();
            Rebind<IClaimDomainService>().To<ClaimDomainServiceRGSL>().InSingletonScope();
        }
    }
}
