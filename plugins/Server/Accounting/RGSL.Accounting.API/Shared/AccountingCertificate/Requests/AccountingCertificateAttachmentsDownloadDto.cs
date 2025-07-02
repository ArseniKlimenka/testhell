using System;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.AccountingCertificate.Requests
{
    public class AccountingCertificateAttachmentsDownloadDto
    {
        public string AttachmentType { get; set; }
        public Guid EntityId { get; set; }
    }
}
