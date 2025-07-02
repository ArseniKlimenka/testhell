using Adacta.AdInsure.Core.Domain.UniversalDocument.Models;
using Adacta.AdInsure.Core.Domain.UniversalVersionedDocument.Models;
using Adacta.AdInsure.Framework.Core.API.Shared.Entities.DocumentEntities.DTO;
using Adacta.AdInsure.Framework.Core.ApplicationContext;
using Adacta.AdInsure.Framework.Core.ApplicationServices.Entities.DocumentEntities.DTO;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Core;
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
using Adacta.AdInsure.Framework.Core.SPI.DuplicateDetection;
using DocumentFormat.OpenXml.Drawing.Charts;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Framework.Domain.UniversalDocument.Services
{
    public class UniversalDocumentCoreDomainServiceRGSL : DocumentDomainServiceBase<UniversalDocumentModel>
    {
        private readonly IIntegrationServiceExecutor _integrationServiceExecutor;
        private const string ENOWMENT_CALC_SERVICE_NAME = "CalculateEndowmentAmounts";
        private const string ENOWMENT_STATE_SERVICE_NAME = "EndowmentBeforeStateChangedHandler";
        private const string SERVICE_VERSION = "1";

        public UniversalDocumentCoreDomainServiceRGSL(
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
            IIntegrationServiceExecutor integrationServiceExecutor
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
            defaultJsonFromSchemaGenerator
              )
        {
            _integrationServiceExecutor = integrationServiceExecutor;
        }

        protected override async Task BeforeDocumentCreatedAsync(UniversalDocumentModel document, IDocument sourceDocument)
        {
            if (document.ConfigurationCodeName == "Endowment")
            {
                await CalculateEndowmentAmounts(document);
            }

            await base.BeforeDocumentCreatedAsync(document, sourceDocument);
        }

        protected override async Task BeforeDocumentUpdatedAsync(UniversalDocumentModel document, UniversalDocumentModel oldDocument)
        {
            if (document.ConfigurationCodeName == "Endowment")
            {   
                await CalculateEndowmentAmounts(document);
            }

            await base.BeforeDocumentUpdatedAsync(document, oldDocument);
        }

        protected override async Task BeforeDocumentStateChangedAsync(UniversalDocumentModel newDocument, UniversalDocumentModel oldDocument, DocumentTransition transition, JsonObject transitionData)
        {
            if (newDocument.ConfigurationCodeName == "Endowment")
            {
                await HandleEndowmentBeforeStateChanged(newDocument);
            }

            await base.BeforeDocumentStateChangedAsync(newDocument, oldDocument, transition, transitionData);
        }

        private async Task CalculateEndowmentAmounts(UniversalDocumentModel document)
        {
            var stringRequest = $"{{\"endowmentNumber\":\"{document.Number}\",\"endowmentState\":\"{document.State?.Code ?? ""}\",\"body\":{document.Body?.ToString() ?? "{}"},\"commonBody\":{document.CommonBody?.ToString() ?? "{}"}}}";

            IntegrationServiceResponse response;

            using (new ApplicationContextImpersonation(new ImpersonationOptions(Guid.Empty, "System")))
            {
                response = await _integrationServiceExecutor.Execute(ENOWMENT_CALC_SERVICE_NAME, SERVICE_VERSION, new JsonObject(stringRequest));
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
            var commonBody = response.Content.ParsedJson["commonBody"]?.ToString();
            document.Body = new JsonObject(body);
            document.CommonBody = new JsonObject(commonBody);

            var documentEntityTypeInfo = EntityTypeRegistry.Instance.GetEntityTypeByCodeName(document.Configuration.EntityType);
            var documentDummy = (IDocument) Activator.CreateInstance(documentEntityTypeInfo.EntityType);
            documentDummy.Body = document.Body;
            documentDummy.Configuration = document.Configuration;
            documentDummy.ExternalData = document.ExternalData;

            EvaluateDocumentRequest documentRequest = new();
            await EvaluateAsync(documentDummy, null, documentRequest);

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

        private async Task HandleEndowmentBeforeStateChanged(UniversalDocumentModel document)
        {
            var stringRequest = $"{{\"endowmentNumber\":\"{document.Number}\",\"endowmentState\":\"{document.State?.Code ?? ""}\"}}";

            IntegrationServiceResponse response;

            using (new ApplicationContextImpersonation(new ImpersonationOptions(Guid.Empty, "System")))
            {
                response = await _integrationServiceExecutor.Execute(ENOWMENT_STATE_SERVICE_NAME, SERVICE_VERSION, new JsonObject(stringRequest));
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
