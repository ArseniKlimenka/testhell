using Adacta.AdInsure.RGSL.Framework.Domain.Activities.Responses;

namespace Adacta.AdInsure.RGSL.Framework.Domain.Activities.Repositories
{
    public interface IActivityIndexerRgslRepository
    {
        ExtraVerificationDataResponse GetExtraVerificationData(string verificationNumber, string contractNumber);
    }
}
