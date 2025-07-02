using Adacta.AdInsure.RGSL.PAS.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Commission.Responses;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.Commission.Services
{
    public interface IPolicyCommissionAppService
    {
        GetPolicyCommissionResponse GetPolicyCommission(GetPolicyCommissionRequest request);
    }
}
