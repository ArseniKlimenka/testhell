using Adacta.AdInsure.Framework.Core.Ioc;
using Adacta.AdInsure.RGSL.Party.Domain.Queries;
using Adacta.AdInsure.RGSL.Party.Domain.Repositories;
using Adacta.AdInsure.RGSL.Party.Infrastructure.Queries;
using Adacta.AdInsure.RGSL.Party.Infrastructure.Repositories;
using Ninject.Syntax;

namespace Adacta.AdInsure.RGSL.Party.Infrastructure
{
    public class RGSLPartyInfrastructureComponent : IocComponent
    {
        public override void Configure() => RegisterClasses(this);

        public static void RegisterClasses(BindingRoot binding)
        {
            binding.Bind<IPartyCommonDataRepositoryRGSL>().To<PartyCommonDataRepositoryRGSL>().InSingletonScope();
            binding.Bind<IPartyCommonDataQueriesRGSL>().To<PartyCommonDataQueriesRGSL>().InSingletonScope();
        }
    }
}
