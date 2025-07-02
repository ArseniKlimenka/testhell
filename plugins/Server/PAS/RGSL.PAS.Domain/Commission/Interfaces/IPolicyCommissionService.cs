using Adacta.AdInsure.RGSL.PAS.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Commission.Responses;

namespace Adacta.AdInsure.RGSL.PAS.Domain.Commission.Interfaces
{
    public interface IPolicyCommissionService
    {
        GetPolicyCommissionResponse GetPolicyCommission(GetPolicyCommissionRequest request);
    }
}
