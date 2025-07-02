using Adacta.AdInsure.Framework.Core.Ioc;
using Adacta.AdInsure.RGSL.Common.Domain.AnalyticalSubsystem.Interfaces;
using Adacta.AdInsure.RGSL.Common.Domain.AnalyticalSubsystem.Services;
using Adacta.AdInsure.RGSL.Common.Domain.HistoryComment.Interfaces;
using Adacta.AdInsure.RGSL.Common.Domain.HistoryComment.Services;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Interfaces;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Services;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Settings;
using Adacta.AdInsure.RGSL.Common.Domain.Transaction.Interfaces;
using Adacta.AdInsure.RGSL.Common.Domain.Transaction.Services;
using Ninject.Syntax;

namespace Adacta.AdInsure.RGSL.Common.Domain
{
    public class RgslCommonDomainComponent : IocComponent
    {
        public override void Configure() => RegisterClasses(this);

        public static void RegisterClasses(BindingRoot binding)
        {
            binding.Bind<ICommonIntegrationSettings>().To<CommonIntegrationSettings>().InSingletonScope();
            binding.Bind<ICbrCurrencyDomainService>().To<CbrCurrencyDomainService>().InSingletonScope();
            binding.Bind<ICbrKeyRateDomainService>().To<CbrKeyRateDomainService>().InSingletonScope();
            binding.Bind<ICbrCurrencyDynamicDomainService>().To<CbrCurrencyDynamicDomainService>().InSingletonScope();
            binding.Bind<ITransactionManagerRgsl>().To<TransactionManagerRgsl>().InSingletonScope();
            binding.Bind<IAssDataEditorService>().To<AssDataEditorService>().InSingletonScope();
            binding.Bind<IHistoryCommentService>().To<HistoryCommentService>().InSingletonScope();
        }
    }
}
