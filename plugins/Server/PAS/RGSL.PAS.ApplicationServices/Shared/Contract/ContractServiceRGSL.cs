using Adacta.AdInsure.Framework.Core.API.Internal.Services;
using Adacta.AdInsure.Framework.Core.API.Shared.ConceptPermissions.Services;
using Adacta.AdInsure.Framework.Core.API.Shared.Entities.DocumentEntities.DTO;
using Adacta.AdInsure.Framework.Core.API.Shared.Entities.DocumentEntities.Interfaces;
using Adacta.AdInsure.Framework.Core.ApplicationServices.Common;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Domain.Entities.Common.Services;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.DTO;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Providers;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Services;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.Framework.Core.ScriptingEngine.Engine;
using Adacta.AdInsure.PAS.ApplicationServices.Contracts;
using Adacta.AdInsure.PAS.Domain.Contracts.Repositories;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.Responses;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.Services;
using Adacta.AdInsure.RGSL.PAS.Domain.Contract.Interfaces;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.PAS.ApplicationServices.Shared.Contract
{
    public class ContractServiceRGSL : ContractService, IContractServiceRGSL
    {
        private readonly IContractDomainServiceRGSL _contractService;
        private readonly IVersionedDocumentDomainService<AdInsure.PAS.Domain.Contracts.Models.Contract> _domainContractService;

        public ContractServiceRGSL(
            IDocumentConfigurationProvider configurationProvider,
            IContractRepository repository,
            IScriptingEngineProvider scriptingEngineProvider,
            IDefaultJsonFromSchemaGenerator defaultJsonFromSchemaGenerator,
            IDocumentErrors documentErrors,
            IConceptPermissionService conceptPermissionService,
            IPartSpecificationProvider partSpecificationBuilder,
            IDocumentAttachmentService documentAttachmentService,
            ITranslationService translationService,
            IVersionedDocumentDomainService<AdInsure.PAS.Domain.Contracts.Models.Contract> documentDomainServiceBase,
            IVersionedDocumentAttachmentService versionedDocumentAttachmentService,
            IContractDomainServiceRGSL contractService) :
            base(configurationProvider,
                 repository,
                 scriptingEngineProvider,
                 defaultJsonFromSchemaGenerator,
                 documentErrors,
                 conceptPermissionService,
                 partSpecificationBuilder,
                 documentAttachmentService,
                 translationService,
                 documentDomainServiceBase,
                 versionedDocumentAttachmentService)
        {
            _contractService = contractService;
            _domainContractService = documentDomainServiceBase;
        }

        public override async Task<IDocumentResponse> CreateDocumentAsync(string configurationCodeName, string version, ICreateDocumentRequest request, bool checkDuplicates = false)
        {
            var aaObject = request.Data.GetJsonTokenAsObject("commission.agentAgreement");
            var aaNumber = aaObject?.ParsedJson["number"].Value<string>() ?? string.Empty;
            var aaId = aaObject?.ParsedJson["id"].Value<string>() ?? string.Empty;
            List<string> enrichments;

            if (request.EnrichFields != null)
            {
                enrichments = request.EnrichFields.ToList();
            }
            else
            {
                enrichments = new List<string>();
            }

            var hasAgentAgreementSelection = enrichments.Any(_ => _ == "/commission" || _.Contains("EnrichAADocument"));
            var hasCommissionCalcExecution = enrichments.Any(_ => _ == "/commission" || _.Contains("CalculateCommission"));

            if ((string.IsNullOrWhiteSpace(aaId) || string.IsNullOrEmpty(aaNumber)) && !hasAgentAgreementSelection)
            {
                enrichments.Add("/commission[EnrichAADocument]");
            }

            if (!hasCommissionCalcExecution)
            {
                enrichments.Add("/commission[CalculateCommission]");
            }

            request.EnrichFields = enrichments;

            return await base.CreateDocumentAsync(configurationCodeName, version, request, checkDuplicates);
        }

        public IEnumerable<ContractInfoRGSL> GetContractsInfoByNumber(ContractsInfoRequest request)
        {
            return _contractService.GetContractsInfoByNumber(request);
        }

        public ContractSysDataRGSL GetContractSysDataByNumber(ContractSysDataRequest request)
        {
            return _contractService.GetContractSysDataByNumber(request);
        }

        public async Task<ManualContractUpdateResponse> UpdateContractManually(ManualContractUpdateRequest request)
        {
            var document = await _domainContractService.GetByNumberAsync(request.ContractNumber)
                ?? throw new BusinessException("Requested document not found!");

            var versionedDocument = (IVersionedDocument) document;
            var initialDocument = (AdInsure.PAS.Domain.Contracts.Models.Contract) versionedDocument.ShallowCopy();

            var initialData = $"{{\"body\":{initialDocument.Body},\"commonBody\":{initialDocument.CommonBody},\"snapshotBody\":{initialDocument.Snapshot}}}";
            var updatedData = $"{{\"body\":{request.Body},\"commonBody\":{request.CommonBody},\"snapshotBody\":{request.SnapshotBody}}}";
            var initialDataObj = new JsonObject(initialData);
            var updatedDataObj = new JsonObject(updatedData);

            versionedDocument.Body = request.Body;
            versionedDocument.CommonBody = request.CommonBody;
            versionedDocument.Snapshot = request.SnapshotBody;

            Repository.Update(document);

            return new ManualContractUpdateResponse()
            {
                InitialData = initialDataObj,
                UpdatedData = updatedDataObj
            };
        }

        public async Task<DocumentEvaluationResult> EvaluateContract(ContractSysDataRequest request)
        {
            var document = await _domainContractService.GetByNumberAsync(request.Number);
            var versionedDocument = (IVersionedDocument) document;

            EvaluateDocumentRequest documentRequest = new();
            await _domainContractService.EvaluateAsync(versionedDocument, null, documentRequest);

            return new DocumentEvaluationResult()
            {
                Body = versionedDocument.Body,
                CommonBody = versionedDocument.CommonBody,
                Ownership = versionedDocument.Ownership,
                Snapshot = versionedDocument.Snapshot,
                Summary = versionedDocument.Summary,
                ValidationResult = versionedDocument.ValidationResult
            };
        }

        public void UpdateContractRisks(ContractRisksRequest request)
        {
            _contractService.UpdateContractRisks(request);
        }
    }
}
