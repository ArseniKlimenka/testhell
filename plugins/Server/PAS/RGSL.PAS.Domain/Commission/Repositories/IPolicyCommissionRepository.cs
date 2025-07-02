using Adacta.AdInsure.RGSL.PAS.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Commission.Responses;

namespace Adacta.AdInsure.RGSL.PAS.Domain.Commission.Repositories
{
    public interface IPolicyCommissionRepository
    {
        GetPolicyCommissionResponse GetPolicyCommission(GetPolicyCommissionRequest request);
    }
}
