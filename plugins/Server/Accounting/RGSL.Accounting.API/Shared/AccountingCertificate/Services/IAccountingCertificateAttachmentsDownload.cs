using Adacta.AdInsure.RGSL.Accounting.API.Shared.AccountingCertificate.Requests;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.AccountingCertificate.Services
{
    public interface IAccountingCertificateAttachmentsDownload
    {
        public Task DownloadAccountingCertificateAttachments(AccountingCertificateAttachmentsDownloadDto dto);
    }
}
