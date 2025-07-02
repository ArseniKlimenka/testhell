using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.Commission.Responses
{
    public class GetPolicyCommissionResponse
    {
        public IList<PolicyCommissionItem> Items { get; set; }
    }
}
