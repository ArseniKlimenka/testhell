using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Responses
{
    public class GetContractResponse
    {
        public IList<AaContractShortInfo> Contracts { get; set; }
    }
}
