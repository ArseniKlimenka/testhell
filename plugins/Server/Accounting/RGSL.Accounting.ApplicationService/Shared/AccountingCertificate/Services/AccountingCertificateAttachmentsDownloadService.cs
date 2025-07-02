using Adacta.AdInsure.DocumentManagement.API.Public.Attachments.Services;
using Adacta.AdInsure.DocumentManagement.Domain.Attachments.Constants;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Services;
using Adacta.AdInsure.Framework.Core.Logging;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.AccountingCertificate.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.AccountingCertificate.Services;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Settings;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AttachmentContent = Adacta.AdInsure.DocumentManagement.API.Public.Attachments.DTO.AttachmentContent;
using AttachmentData = Adacta.AdInsure.Framework.Core.SPI.Attachment.AttachmentData;

namespace Adacta.AdInsure.RGSL.Accounting.ApplicationServices.Shared.AccountingCertificate.Services
{
    public class AccountingCertificateAttachmentsDownloadService : IAccountingCertificateAttachmentsDownload
    {
        private readonly IDocumentAttachmentService _attachmentService;
        private readonly IAttachmentManagementService _attachmentManagementService;
        private readonly ICommonIntegrationSettings _settings;
        private readonly ILogger _logger;
        private string _outputFolder;

        public AccountingCertificateAttachmentsDownloadService
            (
            IDocumentAttachmentService attachmentService,
            IAttachmentManagementService attachmentManagementService,
            ICommonIntegrationSettings settings
            )
        {
            _logger = LogManagerAccessor.GetLogger("AccountingCertificateAttachmentsDownloadServiceLogger");
            _attachmentService = attachmentService;
            _attachmentManagementService = attachmentManagementService;
            _settings = settings;
            _outputFolder = _settings.AccountingCertificateAttachmentFolder;
        }

        public async Task DownloadAccountingCertificateAttachments(AccountingCertificateAttachmentsDownloadDto dto)
        {
            var attachmentData = await GetAttachmentData(dto.EntityId, dto.AttachmentType);

            if (attachmentData == null)
            {
                _logger.LogDebug($"Attachment for {dto.EntityId} not found");
                return;
            }

            var attachmentContent = await GetAttachmentContent(attachmentData.AttachmentId);

            if (attachmentContent == null)
            {
                _logger.LogDebug($"Attachment content for {attachmentData.Name} not found");
                return;
            }

            await SaveAsync(attachmentContent.FileData, UpdateFileName(attachmentData.Name, attachmentContent.Name));
        }

        private async Task<AttachmentData> GetAttachmentData(Guid entityId, string attachmentType)
        {
            var attachmentData = new AttachmentData();

            try
            {
                var attachmentDatas = await _attachmentService.GetAttachmentsMetadatasAsync(entityId);
                attachmentDatas = attachmentDatas
                    .Where(_ => _.AttachmentType == attachmentType)
                    .Where(_ => _.UploadStatus == AttachmentUploadStatusConsts.PendingUpload || _.UploadStatus == AttachmentUploadStatusConsts.Uploaded)
                    .ToList();

                attachmentData = attachmentDatas.FirstOrDefault();
            }
            catch (Exception exception)
            {
                _logger.LogDebug($"Exeption {exception.Message} during getting attachment from entity");
            }

            return attachmentData;
        }

        private async Task<AttachmentContent> GetAttachmentContent(Guid attachmentId)
        {
            var attachmentContent = new AttachmentContent();

            try
            {
                attachmentContent = await _attachmentManagementService.GetAttachmentContent(attachmentId);
            }
            catch (Exception exception)
            {
                _logger.LogDebug($"Exeption {exception.Message} during getting attachmentContent from entity");
            }

            return attachmentContent;
        }

        private async Task SaveAsync(Stream stream, string fileName)
        {
            var fullPath = Path.Combine(_outputFolder, fileName);

            _logger.LogDebug($"Attempt to save account certificate attachment");

            try
            {
                using (var fileStream = new FileStream(
                    fullPath,
                    FileMode.Create,
                    FileAccess.Write,
                    FileShare.None,
                    bufferSize: 4096,
                    useAsync: true))
                {
                    await stream.CopyToAsync(fileStream);
                }
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogDebug($"Access denied to path: {fullPath}", ex);
                throw;
            }
            catch (DirectoryNotFoundException ex)
            {
                _logger.LogDebug($"Directory not found: {_outputFolder}", ex);
                throw;
            }
            catch (IOException ex)
            {
                _logger.LogDebug($"Failed to write file: {fullPath}", ex);
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogDebug($"An error occurred during the download process: {fullPath}", ex);
                throw;
            }
        }

        private string UpdateFileName(string inputFileName, string attachmentContentFileName)
        {
            var pattern = "СПРАВКА_";
            var result = Regex.Replace(inputFileName, pattern, "");
            result = result + Path.GetExtension(attachmentContentFileName);
            return result;
        }
    }
}
