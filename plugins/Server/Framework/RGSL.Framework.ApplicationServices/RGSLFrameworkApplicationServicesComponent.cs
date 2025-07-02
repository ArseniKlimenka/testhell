using Adacta.AdInsure.Framework.Core.Ioc;
using Adacta.AdInsure.RGSL.Framework.API.EntitySearch.Services;
using Adacta.AdInsure.RGSL.Framework.ApplicationServices.EntitySearch;
using Ninject.Syntax;

namespace Adacta.AdInsure.RGSL.Framework.ApplicationServices
{
    public class RGSLFrameworkApplicationServicesComponent : IocComponent
    {
        public override void Configure() => RegisterClasses(this);

        public static void RegisterClasses(BindingRoot binding)
        {
            binding.Bind<IElasticSearchIndexerServiceRGSL>().To<ElasticSearchIndexerServiceRGSL>().InSingletonScope();
        }
    }
}
