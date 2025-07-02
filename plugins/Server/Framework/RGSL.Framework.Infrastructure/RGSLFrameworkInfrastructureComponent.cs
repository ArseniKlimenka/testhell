using Adacta.AdInsure.Framework.Core.Domain.Notifications.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Security.Queries;
using Adacta.AdInsure.Framework.Core.Ioc;
using Adacta.AdInsure.Framework.Messaging.TransactionalOutbox.Database.Queries;
using Adacta.AdInsure.RGSL.Framework.Domain.Activities.Repositories;
using Adacta.AdInsure.RGSL.Framework.Domain.EntitySearch;
using Adacta.AdInsure.RGSL.Framework.Infrastructure.Activities.Repositories;
using Adacta.AdInsure.RGSL.Framework.Infrastructure.EntitySearch;
using Adacta.AdInsure.RGSL.Framework.Infrastructure.Messaging;
using Adacta.AdInsure.RGSL.Framework.Infrastructure.Notifications;
using Adacta.AdInsure.RGSL.Framework.Infrastructure.Security;

namespace Adacta.AdInsure.RGSL.Framework.Infrastructure
{
    public class RGSLFrameworkInfrastructureComponent : IocComponent
    {
        public override void Configure()
        {
            Rebind<IEmailClient>().To<RGSLEmailClient>();
            Rebind<ITransactionalOutboxManagerQueries>().To<TransactionalOutboxManagerQueriesRGSL>().InSingletonScope();
            Rebind<IOAuthQueries>().To<OAuthQueriesRgsl>().InSingletonScope();
            Bind<IActivityIndexerRgslRepository>().To<ActivityIndexerRgslRepository>().InSingletonScope();
            Bind<IElasticSearchIndexerRGSL>().To<ElasticSearchIndexerRGSL>().InSingletonScope();
        }
    }
}
