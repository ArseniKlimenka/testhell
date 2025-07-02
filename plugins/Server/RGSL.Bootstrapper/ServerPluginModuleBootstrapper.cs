using Adacta.AdInsure.Accounting.Domain;
using Adacta.AdInsure.Accounting.Infrastructure;
using Adacta.AdInsure.Framework.Core.Ioc;
using Adacta.AdInsure.Framework.Core.Ioc.External;
using Adacta.AdInsure.ORG.Infrastructure;
using Adacta.AdInsure.PAS.Infrastructure;
using Adacta.AdInsure.RGSL.Accounting.ApplicationServices;
using Adacta.AdInsure.RGSL.Claims.ApplicationServices;
using Adacta.AdInsure.RGSL.Common.ApplicationServices;
using Adacta.AdInsure.RGSL.Common.Domain;
using Adacta.AdInsure.RGSL.Common.Infrastructure;
using Adacta.AdInsure.RGSL.Framework.ApplicationServices;
using Adacta.AdInsure.RGSL.Framework.Domain;
using Adacta.AdInsure.RGSL.Framework.Infrastructure;
using Adacta.AdInsure.RGSL.ORG.ApplicationServices;
using Adacta.AdInsure.RGSL.ORG.Domain;
using Adacta.AdInsure.RGSL.Party.ApplicationServices;
using Adacta.AdInsure.RGSL.Party.Domain;
using Adacta.AdInsure.RGSL.Party.Infrastructure;
using Adacta.AdInsure.RGSL.PAS.ApplicationServices;
using RGSL.Claims.Domain;
using RGSL.Claims.Infrastructure;

namespace Adacta.AdInsure.RGSL.Bootstrapper
{
    public class ServerPluginModuleBootstrapper : PluginModuleBootstrapper
    {
        protected override IocComponent[] GetModuleComponents()
        {
            return new IocComponent[]
            {
                new RGSLAccountingApplicationServiceComponent(),
                new RGSLAccountingInfrastructureComponent(),

                new RGSLPartyApplicationServiceComponent(),
                new RGSLPartyInfrastructureComponent(),
                new RgslPartyDomainComponent(),

                new RGSLCommonApplicationServiceComponent(),
                new RgslCommonDomainComponent(),
                new RGSLCommonInfrastructureComponent(),

                new RgslOrgApplicationServiceComponent(),
                new RgslOrgDomainComponent(),
                new RgslOrgInfrastructureComponent(),

                new RGSLPasApplicationServiceComponent(),
                new RGSLPASDomainComponent(),
                new RGSLPASInfrastructureComponent(),

                new RGSLFrameworkApplicationServicesComponent(),
                new RGSLFrameworkInfrastructureComponent(),
                new RGSLFrameworkDomainComponent(),

                new RGSLClaimsApplicationServicesComponent(),
                new RGSLClaimsDomainComponent(),
                new RGSLClaimsInfrastructureComponent()
            };
        }
    }
}
