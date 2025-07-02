using System.Threading.Tasks;
using Adacta.AdInsure.Framework.Core.Domain.Common;
using Adacta.AdInsure.RGSL.PAS.API.Shared.DigitalSignature.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.DigitalSignature.Responses;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.DigitalSignature.Services
{
    public interface IDigitalSignatureService
    {
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        Task<SignFileResponse> SignPdf(SignFileRequest request);
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        Task<SignPdfAttachmentsResponse> SignPdfAttachmentsForContracts(SignPdfAttachmentsRequest request);
    }
}
