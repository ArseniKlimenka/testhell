using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Requests
{
    public class CalculateCommissionResponse
    {
        public IList<AaPolicyCommissionRule> CommissionRules { get; set; }
    }
}