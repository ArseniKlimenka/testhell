using Adacta.AdInsure.Framework.Core.Ioc;
using Ninject.Syntax;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Queries;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Repositories;
using Adacta.AdInsure.RGSL.Common.Infrastructure.Integration.Cbr.Queries;
using Adacta.AdInsure.RGSL.Common.Infrastructure.Integration.Cbr.Repositories;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.SmsSecurity.Repositories;
using Adacta.AdInsure.RGSL.Common.Infrastructure.Integration.SmsSecurity.Repositories;
using Adacta.AdInsure.RGSL.Common.Infrastructure.Integration.SmsSecurity.Queries;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.SmsSecurity.Queries;
using Adacta.AdInsure.RGSL.Common.Domain.AnalyticalSubsystem.Repositories;
using Adacta.AdInsure.RGSL.Common.Infrastructure.AnalyticalSubsystem.Repositories;
using Adacta.AdInsure.RGSL.Common.Domain.HistoryComment.Repositories;
using Adacta.AdInsure.RGSL.Common.Infrastructure.HistoryComment.Repositories;

namespace Adacta.AdInsure.RGSL.Common.Infrastructure
{
    public class RGSLCommonInfrastructureComponent : IocComponent
    {
        public override void Configure() => RegisterClasses(this);

        public static void RegisterClasses(BindingRoot binding)
        {
            binding.Bind<ICbrCurrencyRepository>().To<CbrCurrencyRepository>().InSingletonScope();
            binding.Bind<ICbrCurrencyQueries>().To<CbrCurrencyQueries>().InSingletonScope();

            binding.Bind<ICbrKeyRateRepository>().To<CbrKeyRateRepository>().InSingletonScope();
            binding.Bind<ICbrKeyRateQueries>().To<CbrKeyRateQueries>().InSingletonScope();

            binding.Bind<ISecuritySmsNotificationRepository>().To<SecuritySmsNotificationRepository>().InSingletonScope();
            binding.Bind<ISecuritySmsNotificationQueries>().To<SecuritySmsNotificationQueries>().InSingletonScope();

            binding.Bind<IAssDataEditorRepository>().To<AssDataEditorRepository>().InSingletonScope();
            binding.Bind<IHistoryCommentRepository>().To<HistoryCommentRepository>().InSingletonScope();
        }
    }
}
