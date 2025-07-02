using Adacta.AdInsure.Framework.Core.Ioc;
using Adacta.AdInsure.RGSL.Party.Domain.Integration.Interfaces;
using Adacta.AdInsure.RGSL.Party.Domain.Integration.Services;
using Adacta.AdInsure.RGSL.Party.Domain.Interfaces;
using Adacta.AdInsure.RGSL.Party.Domain.Services;
using Ninject.Syntax;

namespace Adacta.AdInsure.RGSL.Party.Domain
{
    public  class RgslPartyDomainComponent : IocComponent
    {
        public override void Configure() => RegisterClasses(this);

        public static void RegisterClasses(BindingRoot binding)
        {
            binding.Bind<IPartyCommonDataDomainServiceRGSL>().To<PartyCommonDataDomainServiceRGSL>().InSingletonScope();
            binding.Bind<IBlackListDomainService>().To<BlackListDomainService>().InSingletonScope();
            binding.Bind<ICheckContractorsDomainService>().To<CheckContractorsDomainService>().InSingletonScope();
        }
    }
}
