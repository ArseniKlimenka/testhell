using System.Threading.Tasks;
using Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Responses;
using Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Services;
using Adacta.AdInsure.RGSL.PAS.Domain.AgentAgreement.Interfaces;

namespace Adacta.AdInsure.RGSL.PAS.ApplicationServices.Shared.AgentAgreement.Services
{
    public class AaCommissionAppService : IAaCommissionAppService
    {
        private readonly IAaCommissionService _service;

        public AaCommissionAppService(IAaCommissionService service)
        {
            _service = service;
        }

        public GetContractResponse GetContracts(GetContractRequest request)
        {
            return _service.GetContracts(request);
        }

        public Task<CalculateCommissionResponse> CalculateCommission(CalculateCommissionRequest request)
        {
            return _service.CalculateCommission(request);
        }
    }
}
