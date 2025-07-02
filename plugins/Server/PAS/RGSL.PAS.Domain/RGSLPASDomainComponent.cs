using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.DataSource.Services;
using Adacta.AdInsure.Framework.Core.Domain.Common;
using Adacta.AdInsure.Framework.Core.Domain.ConstraintPermissions.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Entities.Common.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Entities.Common.Services;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Providers;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Services;
using Adacta.AdInsure.Framework.Core.Domain.Entities.IntegrationService.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.SearchDocuments.Interfaces;
using Adacta.AdInsure.Framework.Core.ScriptingEngine.Engine;
using Adacta.AdInsure.Framework.Core.ServerSideEvents;
using Adacta.AdInsure.Framework.Core.Settings.GeneralSettings;
using Adacta.AdInsure.Framework.Core.SPI.DuplicateDetection;
using Adacta.AdInsure.PAS.Domain.Contracts.Models;
using Adacta.AdInsure.RGSL.PAS.Domain.AgentAgreement.Interfaces;
using Adacta.AdInsure.RGSL.PAS.Domain.AgentAgreement.Services;
using Adacta.AdInsure.RGSL.PAS.Domain.Commission.Interfaces;
using Adacta.AdInsure.RGSL.PAS.Domain.Commission.Services;
using Adacta.AdInsure.RGSL.PAS.Domain.Contract.Interfaces;
using Adacta.AdInsure.RGSL.PAS.Domain.Contract.Services;
using Adacta.AdInsure.RGSL.PAS.Domain.Integration.SAP.Interfaces;
using Adacta.AdInsure.RGSL.PAS.Domain.Integration.SendEvent.Interfaces;
using Adacta.AdInsure.RGSL.PAS.Domain.Integration.SendEvent.Services;
using Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit.Interfaces;
using Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit.Services;
using Adacta.AdInsure.RGSL.PAS.DomainService.Integration.SAP.Services;
using Microsoft.Extensions.Configuration;
using Ninject;

namespace Adacta.AdInsure.Accounting.Domain
{
    public class RGSLPASDomainComponent : DomainIocComponent
    {
        public RGSLPASDomainComponent() : base(AdInsureModule.PAS)
        {
        }

        public override void Configure()
        {
            Bind<IAaCommissionService>().To<AaCommissionService>().InSingletonScope();
            Bind<IPolicyCommissionService>().To<PolicyCommissionService>().InSingletonScope();
            Bind<ISAPProxyDomainService>().To<SAPProxyDomainService>().InSingletonScope();
            Bind<ISendEventDomainService>().To<SendEventDomainService>().InSingletonScope();
            Bind<IContractDomainServiceRGSL>().To<ContractDomainServiceRGSL>().InSingletonScope();
            Bind<ICollectiveContractDomainService>().To<CollectiveContractDomainService>().InSingletonScope();
            Bind<IInvestmentProfitDomanService>().To<InvestmentProfitDomanService>().InSingletonScope();

            Rebind<IVersionedDocumentDomainService<Contract>>().ToMethod(
                context =>
                {
                var kernel = context.Kernel;

                return new ContractCoreDomainServiceRGSL(
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
                    kernel.Get<IIntegrationServiceExecutor>(),
                    kernel.Get<IGeneralSettingsProvider>());
                });
        }

        public override void Initialize()
        {
        }
    }
}
