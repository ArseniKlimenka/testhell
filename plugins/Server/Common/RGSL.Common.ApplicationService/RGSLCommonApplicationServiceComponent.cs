using Adacta.AdInsure.Framework.Core.Ioc;
using Adacta.AdInsure.RGSL.Common.API.Shared.AuthToken;
using Adacta.AdInsure.RGSL.Common.API.Shared.Cache;
using Adacta.AdInsure.RGSL.Common.API.Shared.Integration.Services;
using Adacta.AdInsure.RGSL.Common.API.Shared.Services;
using Adacta.AdInsure.RGSL.Common.ApplicationServices.Shared.AuthToken;
using Adacta.AdInsure.RGSL.Common.ApplicationServices.Shared.Cache;
using Adacta.AdInsure.RGSL.Common.ApplicationServices.Shared.Integration;
using Adacta.AdInsure.RGSL.Common.ApplicationServices.Shared.Services;
using Adacta.AdInsure.RGSL.Common.ApplicationServices.Shared.Shell.Dashboards;
using Adacta.AdInsure.Shell.API.Internal.Dashboards.Services;
using Adacta.AdInsure.Shell.ApplicationServices.Internal.Dashboards;
using Ninject.Syntax;

namespace Adacta.AdInsure.RGSL.Common.ApplicationServices
{
    public class RGSLCommonApplicationServiceComponent : IocComponent
    {
        public override void Configure() => RegisterClasses(this);

        public static void RegisterClasses(BindingRoot binding)
        {
            binding.Bind<ITranslationServiceRGSL>().To<TranslationServiceRGSL>().InSingletonScope();
            binding.Bind<IXmlRequestServiceAppRGSL>().To<XmlRequestServiceAppRGSL>().InSingletonScope();
            binding.Bind<IRgslCurrencyConverterService>().To<RgslCurrencyConverterService>().InSingletonScope();
            binding.Bind<IMultiDataSourceRGSL>().To<MultiDataSourceRGSL>().InSingletonScope();
            binding.Bind<ICbrCurrencyService>().To<CbrCurrencyService>().InSingletonScope();
            binding.Bind<ICbrCurrencyDynamicService>().To<CbrCurrencyDynamicService>().InSingletonScope();
            binding.Bind<ICbrKeyRateService>().To<CbrKeyRateService>().InSingletonScope();
            binding.Bind<SecuritySmsGateway>().ToSelf().InSingletonScope();
            binding.Bind<ISmsSecurityCodeManagementService>().To<SmsSecurityCodeManagementService>().InSingletonScope();
            binding.Bind<IMemoryCacheProvider>().To<MemoryCacheProvider>().InSingletonScope();
            binding.Bind<IAuthenticator>().To<Authenticator>().InSingletonScope();
            binding.Bind<IAuthGateway>().To<AuthRestClient>().InSingletonScope();
            binding.Bind<ISequenceGeneratorRGSL>().To<SequenceGeneratorRGSL>().InSingletonScope();
            binding.Bind<IAssDataEditorAppService>().To<AssDataEditorAppService>().InSingletonScope();
            binding.Bind<IDocumentConfigurationInfoProvider>().To<DocumentConfigurationInfoProvider>().InSingletonScope();
            binding.Bind<IActivityServiceRGSL>().To<ActivityServiceRGSL>().InSingletonScope();
            binding.Bind<IHistoryCommentServiceApp>().To<HistoryCommentServiceApp>().InSingletonScope();

            binding.Rebind<IDashboardsGlobalService>().To<DashboardsGlobalServiceRGSL>().InSingletonScope();
            binding.Bind<IDashboardsGlobalService>().To<DashboardsGlobalService>().WhenInjectedInto<DashboardsGlobalServiceRGSL>();
        }
    }
}
