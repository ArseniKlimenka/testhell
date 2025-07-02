using System.Threading.Tasks;
using Adacta.AdInsure.Framework.Core.Domain.Common;
using Adacta.AdInsure.RGSL.Common.API.Shared.Integration.DTOs;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Services
{
    public interface ISmsSecurityCodeManagementService
    {
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        Task<SecuritySmsSendResponse> SendSecuritySms(SecuritySmsSendRequest request);
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        SecurityCodeVerificationResponse VerifySecurityCode(SecurityCodeVerificationRequest request);
    }
}
