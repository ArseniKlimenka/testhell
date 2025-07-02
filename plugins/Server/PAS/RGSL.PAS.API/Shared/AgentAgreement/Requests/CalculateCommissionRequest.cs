using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Requests
{
    public class CalculateCommissionRequest
    {
        public IList<string> ContractNumbers { get; set; }
    }
}