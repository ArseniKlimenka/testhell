using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Configuration.Constants;
using Adacta.AdInsure.Framework.Core.Core;
using Adacta.AdInsure.Framework.Core.Domain.Entities.Common.DTO;
using Adacta.AdInsure.Framework.Core.Domain.Entities.Common.Enums;
using Adacta.AdInsure.Framework.Core.Domain.Entities.Common.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Entities.Common.Providers;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Entities.IntegrationService.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Files.DTO;
using Adacta.AdInsure.Framework.Core.Domain.Files.Services;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.Framework.Core.Ioc.Ninject;
using Adacta.AdInsure.Framework.Core.Logging;
using Adacta.AdInsure.Framework.Core.SPI.Attachment;
using Adacta.AdInsure.PAS.API.Contract.Services;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;
using Adacta.AdInsure.RGSL.Common.API.Constants;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.DigitalSignature.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.DigitalSignature.Responses;
using Adacta.AdInsure.RGSL.PAS.API.Shared.DigitalSignature.Services;
using Adacta.AdInsure.RGSL.PAS.Domain.Contract.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Ninject;
using Attachment = Adacta.AdInsure.Framework.Core.SPI.Attachment.Attachment;

namespace Adacta.AdInsure.RGSL.PAS.ApplicationServices.Shared.DigitalSignature.Services
{
    public class DigitalSignatureService : IDigitalSignatureService
    {
        private readonly DigitalSignatureGateway _gateway;
        private readonly Lazy<ILogger> _logger = new Lazy<ILogger>(() => LogManagerAccessor.GetLogger(LogConstants.DigitalSignature));
        private readonly IFileService _fileService;
        private readonly IAttachmentProvider _attachmentProvider;
        private readonly IContractDomainServiceRGSL _contractServiceRgsl;
        private readonly IRuntimeConfigurationProviderRegister _runtimeConfigurationProviderRegister;
        private readonly IEntityReferenceDomainService _entityReferenceDomainService;
        private readonly IContractService _contractService;
        private readonly IIntegrationServiceExecutor _integrationServiceExecutor;
        private const string CONTRACT_SERVICE_NAME = "GetContractConfigurationInfo";
        private const string CONTRACT_SERVICE_VERSION = "1";

        static readonly (string notSigned, string signed, string printoutConfField, bool isMandatory)[] attachmentPairs = new[]
        {
            (notSigned: "ePolicy", signed: "ePolicyDigitallySigned", printoutConfField: "ePolicyPrintoutName", isMandatory: true),
            (notSigned: "memoCB", signed: "memoCBDigitallySigned", printoutConfField: "ePolicyPrintoutName", isMandatory: false)
        };

        public DigitalSignatureService(DigitalSignatureGateway gateway,
                                       IFileService fileService,
                                       IAttachmentProvider attachmentProvider,
                                       IContractDomainServiceRGSL contractServiceRgsl,
                                       IRuntimeConfigurationProviderRegister runtimeConfigurationProviderRegister,
                                       IEntityReferenceDomainService entityReferenceDomainService,
                                       IContractService contractService,
                                       IIntegrationServiceExecutor integrationServiceExecutor)
        {
            _gateway = gateway;
            _fileService = fileService;
            _attachmentProvider = attachmentProvider;
            _contractServiceRgsl = contractServiceRgsl;
            _runtimeConfigurationProviderRegister = runtimeConfigurationProviderRegister;
            _entityReferenceDomainService = entityReferenceDomainService;
            _contractService = contractService;
            _integrationServiceExecutor = integrationServiceExecutor;
        }

        public async Task<SignFileResponse> SignPdf(SignFileRequest request)
        {
            using var fileResponse = _fileService.Get(request.FileId);

            using var requestMs = new MemoryStream();
            fileResponse.Content.CopyTo(requestMs);
            var byteArr = requestMs.ToArray();

            HttpResponseMessage signResponse;

            try
            {
                signResponse = await _gateway.SendRequest(byteArr);

                if (!signResponse.IsSuccessStatusCode)
                {
                    throw new HttpRequestException(signResponse.ReasonPhrase, null, signResponse.StatusCode);
                }
            }
            catch (Exception e)
            {
                _logger.Value.LogError("Integration request is unsuccessful. : {0}", e.Message);
                throw;
            }

            var result = await signResponse.Content.ReadAsByteArrayAsync();

            using var responseMs = new MemoryStream(result);

            var createFileRequest = new CreateFileRequest()
            {
                Data = responseMs,
                FileName = request.NewFileName ?? fileResponse.FileName,
                Encoding = fileResponse.Encoding,
                MediaType = fileResponse.MediaType
            };

            var createFileResponse = _fileService.Create(createFileRequest);

            signResponse.Dispose();
            return new SignFileResponse() { FileId = createFileResponse.FileId };
        }

        public async Task<SignPdfAttachmentsResponse> SignPdfAttachmentsForContracts(SignPdfAttachmentsRequest request)
        {
            if (!request.Items?.Any() ?? true || request.Items.Any(item => string.IsNullOrWhiteSpace(item.Number)))
            {
                throw new ArgumentNullException(nameof(request), "Request is empty!");
            }

            var response = new SignPdfAttachmentsResponse();

            var contractNumbers = request.Items.Select(item => item.Number).ToList();
            var contracts = _contractServiceRgsl.GetContractsInfoByNumber(new ContractsInfoRequest() { Numbers = contractNumbers });

            var notFoundContracts = contractNumbers.Where(n => !contracts.Any(c => c.ContractNumber == n));

            if (notFoundContracts.Any())
            {
                response.HasErrors = true;
                response.ErrorMessages.Add($"Contracts not found: {string.Join(',', notFoundContracts)}");
            }

            var contractIds = contracts.Select(c => c.ContractId).ToList();
            var contactsAttachments = await _attachmentProvider.GetAttachmentsForEntitiesAsync(contractIds, new GetAttachmentsRequestOptions());
            var filteredAttachments = contactsAttachments.Where(a => attachmentPairs.Any(p => p.signed == a.AttachmentType || p.notSigned == a.AttachmentType));

            var contractsPairs = contracts
                .Select(c => new
                {
                    contract = c,
                    regenerateBaseAttachment = request.Items.First(item => item.Number == c.ContractNumber).RegenerateBaseAttachment,
                    attachments = filteredAttachments.Where(a => a.RelatedEntities.Any(e => e.EntityRefId == c.ContractId))
                });

            foreach (var contractPair in contractsPairs)
            {
                foreach (var (notSigned, signed, printoutConfField, isMandatory) in attachmentPairs)
                {
                    try
                    {
                        await ProcessContract(contractPair.contract,
                                        contractPair.attachments,
                                        contractPair.regenerateBaseAttachment,
                                        signed,
                                        notSigned,
                                        printoutConfField,
                                        isMandatory);
                    }
                    catch (Exception ex)
                    {
                        response.HasErrors = true;
                        response.ErrorMessages.Add($"Error while processing contract {contractPair.contract.ContractNumber}. Message: {ex.Message}");
                        continue;
                    }
                }
            }

            return response;
        }

        private async Task ProcessContract(ContractInfoRGSL contract,
                                     IEnumerable<Attachment> attachments,
                                     bool regenerateBaseAttachment,
                                     string signedName,
                                     string notSignedName,
                                     string printoutConfField,
                                     bool isMandatory)
        {
            var signed = attachments.OrderByDescending(a => a.ReceiptDate).FirstOrDefault(a => a.AttachmentType == signedName);
            var notSigned = attachments.OrderByDescending(a => a.ReceiptDate).FirstOrDefault(a => a.AttachmentType == notSignedName);

            var configurationProvider = _runtimeConfigurationProviderRegister.Get(contract.ConceptTypeId);
            var conf = configurationProvider.GetByVersion(contract.CodeName, contract.PublishedVersion, true);
            var translationsItem = conf.Items.FirstOrDefault(i => i.ConceptTypeId == ConceptTypeConsts.Translation &&
                                                                  i.CodeName == $"{contract.CodeName}ru-RU");

            var availableAttachments = await _contractService.GetAvailableAttachmentTypesAsync(conf.CodeName, "1", contract.ContractNumber);

            if (!availableAttachments.Incoming.Any(item => item.AttachmentType == notSignedName) ||
                !availableAttachments.Incoming.Any(item => item.AttachmentType == signedName))
            {
                return;
            }


            if (notSigned == null || regenerateBaseAttachment)
            {
                if (notSigned != null)
                {
                    var isDeleted = _attachmentProvider.DeleteAttachment(notSigned.AttachmentId, contract.ContractId);

                    if (!isDeleted)
                    {
                        throw new OperationCanceledException($"Existing {notSigned} attachment deletion has failed. New attachment will not be created.");
                    }
                }

                var stringConfRequest = $"{{\"productCode\":\"{contract.ProductCode}\",\"atDate\":\"{DateTime.Now.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture)}\"}}";

                var contractConfInfo = await _integrationServiceExecutor.Execute(CONTRACT_SERVICE_NAME, CONTRACT_SERVICE_VERSION, new JsonObject(stringConfRequest));

                if (contractConfInfo.Code == (int) IntegrationServiceResponseConst.Error)
                {
                    var errorMessage = contractConfInfo.Content.ParsedJson["errorData"]["message"].ToString();
                    throw new BusinessException(errorMessage);
                }

                if (contractConfInfo.Code != (int) IntegrationServiceResponseConst.Success)
                {
                    string errorMessage = contractConfInfo.Content.ParsedJson.ToString();
                    throw new InvalidOperationException(errorMessage);
                }

                var printoutName = contractConfInfo.Content.ParsedJson[printoutConfField]?.ToString();

                if (string.IsNullOrWhiteSpace(printoutName))
                {
                    if (!isMandatory)
                    {
                        return;
                    }

                    throw new OperationCanceledException($"Could not find printout name for {notSigned} attachment. New attachment will not be created.");
                }

                var fileId = await PrintAttachment(contract.ContractId, printoutName);
                var notSignedTranslationKey = $"{contract.CodeName}@{notSignedName}";
                var notSignedTranslatedName = translationsItem?.ParsedJsonBody[notSignedTranslationKey]?.ToString() ?? $"?ru-RU?{notSignedTranslationKey}";

                _attachmentProvider.CreateAttachment(
               new Attachment
               {
                   AttachmentType = notSignedName,
                   ReceiptDate = DateTime.Now,
                   Name = notSignedTranslatedName,
                   AttachmentDescription = notSignedTranslatedName,
                   AttachmentTypeName = notSignedTranslatedName,
                   FileName = notSignedTranslatedName,
                   RelatedEntities = new List<AttachmentRelatedEntity>()
                   {
                                new AttachmentRelatedEntity()
                                {
                                    IsPrimaryAssociation = true,
                                    EntityRefId = contract.ContractId,
                                    PublishedArtifactId = contract.ArtifactId
                                }
                   }
               }, fileId);

                notSigned = new Attachment()
                {
                    FileMetadataId = fileId
                };
            }

            var translationKey = $"{contract.CodeName}@{signedName}";
            var translatedName = translationsItem?.ParsedJsonBody[translationKey]?.ToString() ?? $"?ru-RU?{translationKey}";

            var signedFile = await SignPdf(new SignFileRequest() { FileId = notSigned.FileMetadataId.Value, NewFileName = $"{translatedName}.pdf" });

            if (signed != null)
            {
                var isDeleted = _attachmentProvider.DeleteAttachment(signed.AttachmentId, contract.ContractId);

                if (!isDeleted)
                {
                    throw new OperationCanceledException($"Existing {signedName} attachment deletion has failed. New attachment will not be created.");
                }
            }

            _attachmentProvider.CreateAttachment(
                new Attachment
                {
                    AttachmentType = signedName,
                    ReceiptDate = DateTime.Now,
                    Name = translatedName,
                    AttachmentDescription = translatedName,
                    AttachmentTypeName = translatedName,
                    FileName = translatedName,
                    RelatedEntities = new List<AttachmentRelatedEntity>()
                    {
                                new AttachmentRelatedEntity()
                                {
                                    IsPrimaryAssociation = true,
                                    EntityRefId = contract.ContractId,
                                    PublishedArtifactId = contract.ArtifactId
                                }
                    }
                }, signedFile.FileId);
        }

        private async Task<Guid> PrintAttachment(Guid contractId, string attachmentType)
        {
            var commonEntity = _entityReferenceDomainService.ResolveEntityById(contractId);
            var entityTypeInfo = EntityTypeRegistry.Instance.GetEntityTypeByCodeName(commonEntity.EntityType);
            var documentDomainService = (IDocumentDomainService<IDocument>) NinjectKernel.Instance.Get(entityTypeInfo.DomainServiceType);

            var printoutPrintRequests = new List<PrintoutPrintRequest>();
            printoutPrintRequests.Add(new PrintoutPrintRequest()
            {
                AttachmentType = attachmentType,
                WriteMode = AttachmentPrintRequestModeEnum.WriteFile
            });

            var entityPrintResponse = await documentDomainService.PrintAsync((IDocument) commonEntity, printoutPrintRequests);
            var fileId = entityPrintResponse.PrintoutIds.FilePrintoutIds.First().Value;

            return fileId;
        }
    }
}
