using Adacta.AdInsure.Framework.Core.API.Shared.Entities.DocumentEntities.DTO;
using Adacta.AdInsure.Framework.Core.API.Shared.Entities.DocumentEntities.Interfaces;
using Adacta.AdInsure.Framework.Core.ApplicationContext;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Core;
using Adacta.AdInsure.Framework.Core.Ioc.Ninject;
using Adacta.AdInsure.Framework.Core.DataSource.Services;
using Adacta.AdInsure.Framework.Core.Domain.ConstraintPermissions.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Entities.Common.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Entities.Common.Services;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.DTO;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Providers;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Services;
using Adacta.AdInsure.Framework.Core.Domain.Entities.IntegrationService.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Entities.IntegrationService.Models;
using Adacta.AdInsure.Framework.Core.Domain.SearchDocuments.Interfaces;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.Framework.Core.ScriptingEngine.Engine;
using Adacta.AdInsure.Framework.Core.ServerSideEvents;
using Adacta.AdInsure.Framework.Core.Settings.GeneralSettings;
using Adacta.AdInsure.Framework.Core.SPI.DuplicateDetection;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;
using Adacta.AdInsure.RGSL.PAS.API.Consts;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using ContractCore = Adacta.AdInsure.PAS.Domain.Contracts.Models.Contract;

namespace Adacta.AdInsure.RGSL.PAS.Domain.Contract.Services
{
    public class ContractCoreDomainServiceRGSL : VersionedDocumentDomainServiceBase<ContractCore>
    {
        private readonly IIntegrationServiceExecutor _integrationServiceExecutor;
        private const string CONTRACT_SERVICE_NAME = "AfterContractEvaluationHandlerService";
        private const string CANCELLATION_CALC_SERVICE_NAME = "CalculateCancellationAmounts";
        private const string CANCELLATION_STATE_SERVICE_NAME = "CancellationBeforeStateChangedHandler";
        private const string SERVICE_VERSION = "1";

        public ContractCoreDomainServiceRGSL(
            IScriptingEngineProvider scriptingEngineProvider,
            IDocumentErrors documentErrors,
            IDocumentBusinessNumberGenerator businessNumberGenerator,
            IEntityReferenceDomainService entityReferenceDomainService,
            IConstraintPermissionDomainService constraintPermissionDomainService,
            ITransitionGuardsEvaluationService transitionGuardsEvaluation,
            ICommentDomainService commentDomainService,
            IDataSourceService dataSourceService,
            ISearchDocumentConverter searchDocumentConverter,
            ISearchDocumentMetadataProvider searchDocumentMetadataProvider,
            IEntityDuplicateDetectionService entityDuplicateDetectionService,
            IVersionedDocumentAttachmentService versionedDocumentAttachmentService,
            IServerSideEventPublisher serverSideEventPublisher,
            IDocumentConfigurationProvider configurationProvider,
            IDefaultJsonFromSchemaGenerator defaultJsonFromSchemaGenerator,
            IIntegrationServiceExecutor integrationServiceExecutor,
            IGeneralSettingsProvider settingsProvider
        )
        : base(
            scriptingEngineProvider,
            documentErrors,
            businessNumberGenerator,
            entityReferenceDomainService,
            constraintPermissionDomainService,
            transitionGuardsEvaluation,
            commentDomainService,
            dataSourceService,
            searchDocumentConverter,
            searchDocumentMetadataProvider,
            entityDuplicateDetectionService,
            versionedDocumentAttachmentService,
            serverSideEventPublisher,
            configurationProvider,
            defaultJsonFromSchemaGenerator,
            settingsProvider
              )
        {
            _integrationServiceExecutor = integrationServiceExecutor;
        }

        protected override void CheckIfAllowedToUpdateDocument(ContractCore document)
        {
            if (ApplicationContext.Properties.ContainsKey(CommonConsts.AllowActiveDocumentsUpdate))
            {
                return;
            }
            base.CheckIfAllowedToUpdateDocument(document);
        }

        protected override async Task AfterDocumentEvaluatedAsync(ContractCore document)
        {
            var contractType = document.Configuration.Dimensions.ParsedJson["contractType"]?.ToString();
            var amendmentType = document.Configuration.Dimensions.ParsedJson["amendmentType"]?.ToString();
            var stringRequest = $"{{\"contractType\":\"{contractType}\",\"amendmentType\":\"{amendmentType}\",\"body\":{document.Body?.ToString() ?? "{}"},\"commonBody\":{document.CommonBody?.ToString() ?? "{}"},\"snapshotBody\":{document.Snapshot?.ToString() ?? "{}"},\"summary\":{document.Summary?.ToString() ?? "{}"}}}";

            IntegrationServiceResponse response;

            using (new ApplicationContextImpersonation(new ImpersonationOptions(Guid.Empty, "System")))
            {
                response = await _integrationServiceExecutor.Execute(CONTRACT_SERVICE_NAME, SERVICE_VERSION, new JsonObject(stringRequest));
            }

            if (response.Code == (int) IntegrationServiceResponseConst.Error)
            {
                var errorMessage = response.Content.ParsedJson["errorData"]["message"].ToString();
                throw new BusinessException(errorMessage);
            }

            if (response.Code != (int) IntegrationServiceResponseConst.Success)
            {
                string errorMessage = response.Content.ParsedJson.ToString();
                throw new InvalidOperationException(errorMessage);
            }

            var body = response.Content.ParsedJson["body"]?.ToString();
            var commonBody = response.Content.ParsedJson["commonBody"]?.ToString();
            var snapshotBody = response.Content.ParsedJson["snapshotBody"]?.ToString();
            var summary = response.Content.ParsedJson["summary"]?.ToString();

            document.Body = new JsonObject(body);
            document.CommonBody = new JsonObject(commonBody);
            document.Snapshot = new JsonObject(snapshotBody);
            document.Summary = new JsonObject(summary);

            await base.AfterDocumentEvaluatedAsync(document);
        }

        protected override async Task BeforeDocumentCreatedAsync(ContractCore document, IDocument sourceDocument)
        {
            var amendmentType = document.Configuration.Dimensions.ParsedJson["amendmentType"]?.ToString();

            if (amendmentType == "Cancellation")
            {
                await CalculateCancellationAmounts(document);
            }

            await base.BeforeDocumentCreatedAsync(document, sourceDocument);
        }

        protected override async Task BeforeDocumentUpdatedAsync(ContractCore document, ContractCore oldDocument)
        {
            var amendmentType = document.Configuration.Dimensions.ParsedJson["amendmentType"]?.ToString();

            if (amendmentType == "Cancellation")
            {
                await CalculateCancellationAmounts(document);
            }

            await base.BeforeDocumentUpdatedAsync(document, oldDocument);
        }

        protected override async Task BeforeDocumentStateChangedAsync(ContractCore newDocument, ContractCore oldDocument, DocumentTransition transition, JsonObject transitionData)
        {
            var amendmentType = newDocument.Configuration.Dimensions.ParsedJson["amendmentType"]?.ToString();

            if (amendmentType == "Cancellation")
            {
                await HandleCancellationBeforeStateChanged(newDocument);
            }

            await base.BeforeDocumentStateChangedAsync(newDocument, oldDocument, transition, transitionData);
        }

        private async Task CalculateCancellationAmounts(ContractCore document)
        {
            var stringRequest = $"{{\"contractNumber\":\"{document.OriginalDocumentNumber}\",\"amendmentNumber\":\"{document.Number}\",\"amendmentConfName\":\"{document.ConfigurationCodeName}\",\"amendmentState\":\"{document.State?.Code ?? ""}\",\"body\":{document.Body?.ToString() ?? "{}"}}}";

            IntegrationServiceResponse response;

            using (new ApplicationContextImpersonation(new ImpersonationOptions(Guid.Empty, "System")))
            {
                response = await _integrationServiceExecutor.Execute(CANCELLATION_CALC_SERVICE_NAME, SERVICE_VERSION, new JsonObject(stringRequest));
            }

            if (response.Code == 422)
            {
                var errorMessage = response.Content.ParsedJson["errorResponse"]["message"].ToString();
                throw new BusinessException(errorMessage);
            }

            if (response.Code != 200)
            {
                string errorMessage = response.Content.ParsedJson.ToString();
                throw new InvalidOperationException(errorMessage);
            }

            var body = response.Content.ParsedJson["body"]?.ToString();
            document.Body = new JsonObject(body);

            var documentEntityTypeInfo = EntityTypeRegistry.Instance.GetEntityTypeByCodeName(document.Configuration.EntityType);
            var documentDomainService = (IDocumentDomainService<IDocument>) NinjectKernel.Instance.GetService(documentEntityTypeInfo.DomainServiceType);
            var documentDummy = (IDocument) Activator.CreateInstance(documentEntityTypeInfo.EntityType);
            documentDummy.Body = document.Body;
            documentDummy.Configuration = document.Configuration;
            documentDummy.ExternalData = document.ExternalData;

            EvaluateDocumentRequest documentRequest = new();

            if (documentDummy.Configuration.IsAmendment)
            {
                var versionedDocument = (IVersionedDocument) document;
                var versionedDocumentDomainService = (IVersionedDocumentDomainService<IVersionedDocument>) documentDomainService;

                var evaluationContext = new Dictionary<string, object>();

                var previousDocument = await versionedDocumentDomainService.GetPreviousDocumentForEvaluationAsync(versionedDocument);
                evaluationContext[EvaluationContextKeys.PREVIOUS_DOCUMENT] = previousDocument;

                await versionedDocumentDomainService.EvaluateAsync(document, evaluationContext, documentRequest);
            }
            else
            {
                await documentDomainService.EvaluateAsync(document, null, documentRequest);
            }

            var dummyValidations = documentDummy.ValidationResult.ParsedJson.SelectToken("schemaValidations");
            var exisitngValidations = document.ValidationResult.ParsedJson.SelectToken("schemaValidations");

            if (dummyValidations != null && exisitngValidations != null)
            {
                exisitngValidations.Replace(dummyValidations);
            }
            else if (dummyValidations != null && exisitngValidations == null)
            {
                document.ValidationResult.ParsedJson.Add("schemaValidations", dummyValidations);
            }
            else if (dummyValidations == null && exisitngValidations != null)
            {
                document.ValidationResult.ParsedJson.Remove("schemaValidations");
            }
        }

        private async Task HandleCancellationBeforeStateChanged(ContractCore document)
        {
            var stringRequest = $"{{\"amendmentNumber\":\"{document.Number}\",\"amendmentConfiguration\":\"{document.ConfigurationCodeName}\",\"amendmentState\":\"{document.State?.Code ?? ""}\"}}";

            IntegrationServiceResponse response;

            using (new ApplicationContextImpersonation(new ImpersonationOptions(Guid.Empty, "System")))
            {
                response = await _integrationServiceExecutor.Execute(CANCELLATION_STATE_SERVICE_NAME, SERVICE_VERSION, new JsonObject(stringRequest));
            }

            if (response.Code == 422)
            {
                var errorMessage = response.Content.ParsedJson["errorResponse"]["message"].ToString();
                throw new BusinessException(errorMessage);
            }

            else if (response.Code != 200)
            {
                string errorMessage = response.Content.ParsedJson.ToString();
                throw new InvalidOperationException(errorMessage);
            }
        }
    }
}