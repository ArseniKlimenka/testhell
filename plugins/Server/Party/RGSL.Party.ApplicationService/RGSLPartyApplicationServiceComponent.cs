using Adacta.AdInsure.Framework.Core.Ioc;
using Adacta.AdInsure.RGSL.Party.API.Services;
using Adacta.AdInsure.RGSL.Party.Domain.Integration.Interfaces;
using Adacta.AdInsure.RGSL.Party.Domain.Integration.Services;
using Adacta.AdInsure.RGSL.Party.ApplicationServices.Services;
using Ninject.Syntax;
using Adacta.AdInsure.Framework.Core.Domain.Entities.Common.Interfaces;
using Adacta.AdInsure.Party.API.Shared.Party.Services;
using Adacta.AdInsure.Framework.Core.Ioc.Ninject;
using Ninject;

namespace Adacta.AdInsure.RGSL.Party.ApplicationServices
{
    public class RGSLPartyApplicationServiceComponent : IocComponent
    {
        public override void Configure() => RegisterClasses(this);

        public static void RegisterClasses(BindingRoot binding)
        {
            binding.Bind<ITestService>().To<TestService>().InSingletonScope();
            binding.Bind<IDadataService>().To<DadataService>().InSingletonScope();
            binding.Bind<IDadataSettings>().To<DadataSettings>().InSingletonScope();
            binding.Bind<ICheckContractorsService>().To<CheckContractorsService>().InSingletonScope();
            binding.Bind<ICheckBlackListService>().To<CheckBlackListService>().InSingletonScope();
            binding.Bind<IPartyCommonDataServiceRGSL>().To<PartyCommonDataServiceRGSL>().InSingletonScope();
        }

        public override void Initialize() => RegisterApiForResolver();

        public void RegisterApiForResolver()
        {
            var registry = KernelInstance.Get<IEntityResolverRegistry>();
            var partyCommonDataService = KernelInstance.Get<IPartyCommonDataServiceRGSL>();

            registry.RegisterApi("api/party/public/parties-rgsl/common-data/body/{code}", new ExpressionBasedRelatedEntityResolver((args) =>
               partyCommonDataService.GetBodyByCode(args["code"].ToString()))
            );
        }
    }
}
