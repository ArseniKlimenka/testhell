using Adacta.AdInsure.RGSL.PAS.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Commission.Responses;
using Adacta.AdInsure.RGSL.PAS.Domain.Commission.Interfaces;
using Adacta.AdInsure.RGSL.PAS.Domain.Commission.Repositories;

namespace Adacta.AdInsure.RGSL.PAS.Domain.Commission.Services
{
    public class PolicyCommissionService : IPolicyCommissionService
    {
        private readonly IPolicyCommissionRepository _policyCommissionRepository;

        public PolicyCommissionService(IPolicyCommissionRepository policyCommissionRepository)
        {
            _policyCommissionRepository = policyCommissionRepository;
        }

        public GetPolicyCommissionResponse GetPolicyCommission(GetPolicyCommissionRequest request)
        {
            return _policyCommissionRepository.GetPolicyCommission(request);
        }
    }
}
