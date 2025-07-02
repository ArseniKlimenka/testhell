using Adacta.AdInsure.Framework.Core.API.Shared.Entities.DocumentEntities.DTO;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Core;
using Adacta.AdInsure.Framework.Core.Data.Orm;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.DTO;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Entities.IntegrationService.Interfaces;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.Framework.Core.Infrastructure.Activities.Queries;
using Adacta.AdInsure.Framework.Core.Infrastructure.Attachments.Queries;
using Adacta.AdInsure.Framework.Core.Infrastructure.Entities.Common.Repositories;
using Adacta.AdInsure.Framework.Core.Ioc.Ninject;
using Adacta.AdInsure.PAS.Domain.Contracts.Queries;
using Adacta.AdInsure.PAS.Infrastructure.Contracts.DTO;
using Adacta.AdInsure.PAS.Infrastructure.Contracts.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ContractCore = Adacta.AdInsure.PAS.Domain.Contracts.Models.Contract;

namespace Adacta.AdInsure.RGSL.PAS.Infrastructure.Contract.Repositories
{
    public class ContractRepositoryCoreRGSL : ContractRepository
    {
        private readonly IIntegrationServiceExecutor _integrationServiceExecutor;
        private const string CANCELLATION_CALC_SERVICE_NAME = "CalculateCancellationAmounts";
        private const string SERVICE_VERSION = "1";

        public ContractRepositoryCoreRGSL(DatabaseFactory databaseFactory,
            IContractQueries contractQueries,
            DomainDtoConverter<ContractCore, ContractDto> contractConverter,
            IHistoryRepository<ContractDto,
            ContractHistoryDto> historyRepository,
            IActivityDalQueries activityDalQueries,
            IAttachmentDalQueries attachmentDalQueries,
            IIntegrationServiceExecutor integrationServiceExecutor) : base(databaseFactory, contractQueries, contractConverter, historyRepository, activityDalQueries, attachmentDalQueries)
        {
            _integrationServiceExecutor = integrationServiceExecutor;
        }

        protected override async Task<ContractDto> UpdateImplementationAsync(ContractCore document)
        {
            var amendmentType = document.Configuration.Dimensions.ParsedJson["amendmentType"]?.ToString();

            if (amendmentType == "Cancellation")
            {
                await CalculateCancellationAmounts(document);
            }

            var result = await base.UpdateImplementationAsync(document);
            return result;
        }

        private async Task CalculateCancellationAmounts(ContractCore document)
        {
            var stringRequest = $"{{\"contractNumber\":\"{document.OriginalDocumentNumber}\",\"amendmentNumber\":\"{document.Number}\",\"amendmentConfName\":\"{document.ConfigurationCodeName}\",\"amendmentState\":\"{document.State?.Code ?? ""}\",\"body\":{document.Body?.ToString() ?? "{}"}}}";
            var response = await _integrationServiceExecutor.Execute(CANCELLATION_CALC_SERVICE_NAME, SERVICE_VERSION, new JsonObject(stringRequest));

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
            var documentDomainService = (IVersionedDocumentDomainService<IVersionedDocument>) NinjectKernel.Instance.GetService(documentEntityTypeInfo.DomainServiceType);

            var documentDummy = (IDocument) Activator.CreateInstance(documentEntityTypeInfo.EntityType);
            documentDummy.Body = document.Body;
            documentDummy.Configuration = document.Configuration;
            documentDummy.ExternalData = document.ExternalData;

            var previousDocument = await documentDomainService.GetPreviousDocumentForEvaluationAsync(document);

            var evaluationContext = new Dictionary<string, object>();
            evaluationContext[EvaluationContextKeys.PREVIOUS_DOCUMENT] = previousDocument;

            EvaluateDocumentRequest documentRequest = new();
            await documentDomainService.EvaluateAsync(documentDummy, evaluationContext, documentRequest);

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
    }
}
