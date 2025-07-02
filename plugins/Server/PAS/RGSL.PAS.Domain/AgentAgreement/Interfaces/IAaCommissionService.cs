using System.Threading.Tasks;
using Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Responses;

namespace Adacta.AdInsure.RGSL.PAS.Domain.AgentAgreement.Interfaces
{
    public interface IAaCommissionService
    {
        GetContractResponse GetContracts(GetContractRequest request);
        Task<CalculateCommissionResponse> CalculateCommission(CalculateCommissionRequest request);
    }
}
