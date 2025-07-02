using Adacta.AdInsure.RGSL.PAS.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Commission.Responses;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Commission.Services;
using Adacta.AdInsure.RGSL.PAS.Domain.Commission.Interfaces;

namespace Adacta.AdInsure.RGSL.PAS.ApplicationServices.Shared.Commission.Services
{
    public class PolicyCommissionAppService : IPolicyCommissionAppService
    {
        private readonly IPolicyCommissionService _policyCommissionService;

        public PolicyCommissionAppService(IPolicyCommissionService policyCommissionService)
        {
            _policyCommissionService = policyCommissionService;
        }

        public GetPolicyCommissionResponse GetPolicyCommission(GetPolicyCommissionRequest request)
        {
            return _policyCommissionService.GetPolicyCommission(request);
        }
    }
}
