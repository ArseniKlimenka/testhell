using Adacta.AdInsure.Core.Domain.UniversalDocument.Models;
using Adacta.AdInsure.Framework.Core.API.Shared.Common.DomainEvents;
using Adacta.AdInsure.Framework.Core.DataSource.Services;
using Adacta.AdInsure.Framework.Core.Domain.ConstraintPermissions.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Entities.Common.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Entities.Common.Services;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Providers;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Services;
using Adacta.AdInsure.Framework.Core.Domain.Entities.IntegrationService.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Integration.Sinks;
using Adacta.AdInsure.Framework.Core.Domain.Integration.TransactionScoping;
using Adacta.AdInsure.Framework.Core.Domain.SearchDocuments.Interfaces;
using Adacta.AdInsure.Framework.Core.Ioc;
using Adacta.AdInsure.Framework.Core.Ioc.Ninject;
using Adacta.AdInsure.Framework.Core.ScriptingEngine.Engine;
using Adacta.AdInsure.Framework.Core.SearchDocuments.Interfaces;
using Adacta.AdInsure.Framework.Core.ServerSideEvents;
using Adacta.AdInsure.Framework.Core.SPI.DuplicateDetection;
using Adacta.AdInsure.RGSL.Framework.Domain.Activities;
using Adacta.AdInsure.RGSL.Framework.Domain.Entities.DocumentEntities.Services;
using Adacta.AdInsure.RGSL.Framework.Domain.Integration.Sinks;
using Adacta.AdInsure.RGSL.Framework.Domain.UniversalDocument.Services;
using Ninject;
using Ninject.Syntax;

namespace Adacta.AdInsure.RGSL.Framework.Domain
{
    public class RGSLFrameworkDomainComponent : IocComponent
    {
        public override void Configure() => RegisterClasses(this);

        public override void Initialize()
        {
            InitializeDataProviders();
        }

        public static void RegisterClasses(BindingRoot binding)
        {
            binding.Rebind<IDocumentErrors>().To<DocumentErrorsServiceRGSL>().InSingletonScope();

            binding.Rebind<NotificationSinkExecutor>().To<RGSLNotificationSinkExecutor>().InSingletonScope();
            binding.Rebind<DocumentSinkExecutor>().To<RGSLDocumentSinkExecutor>().InSingletonScope();
            binding.Rebind<DocumentTransitionSinkExecutor>().To<RGSLDocumentTransitionSinkExecutor>().InSingletonScope();

            binding.Rebind<IDocumentDomainService<UniversalDocumentModel>>().ToMethod(
                context =>
                {
                    var kernel = context.Kernel;

                    return new UniversalDocumentCoreDomainServiceRGSL(
                        kernel.Get<IScriptingEngineProvider>(),
                        kernel.Get<IDocumentErrors>(),
                        kernel.Get<IDocumentBusinessNumberGenerator>(),
                        kernel.Get<IEntityReferenceDomainService>(),
                        kernel.Get<IConstraintPermissionDomainService>(),
                        kernel.Get<ITransitionGuardsEvaluationService>(),
                        kernel.Get<CommentDomainService>(),
                        kernel.Get<IDataSourceService>(),
                        kernel.Get<ISearchDocumentConverter>(),
                        kernel.Get<ISearchDocumentMetadataProvider>(),
                        kernel.Get<IEntityDuplicateDetectionService>(),
                        kernel.Get<IVersionedDocumentAttachmentService>(),
                        kernel.Get<IServerSideEventPublisher>(),
                        kernel.Get<IDocumentConfigurationProvider>(),
                        kernel.Get<IDefaultJsonFromSchemaGenerator>(),
                        kernel.Get<IIntegrationServiceExecutor>());
                });
        }

        private void InitializeDataProviders()
        {
            var indexerDataProviderRegistry = KernelInstance.Get<IIndexerDataProviderRegistry>();
            var activityIndexerDataProvider = KernelInstance.Get<ActivityIndexerRgslDataProvider>();
            indexerDataProviderRegistry.Register(SynchronizationDocumentType.Activity, activityIndexerDataProvider);
        }
    }
}
