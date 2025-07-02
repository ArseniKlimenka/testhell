using Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Responses;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.PAS.Domain.AgentAgreement.Repositories
{
    public interface IAaCommissionRepository
    {
        GetContractResponse GetContracts(GetContractRequest request);
        Task<List<JObject>> GetCommissionRules(CalculateCommissionRequest request);
    }
}
