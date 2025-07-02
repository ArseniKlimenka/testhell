using System.Threading.Tasks;
using Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Responses;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Services
{
    public interface IAaCommissionAppService
    {
        GetContractResponse GetContracts(GetContractRequest request);
        Task<CalculateCommissionResponse> CalculateCommission(CalculateCommissionRequest request);
    }
}
