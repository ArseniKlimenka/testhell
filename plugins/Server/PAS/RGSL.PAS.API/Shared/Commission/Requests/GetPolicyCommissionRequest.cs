using System;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.Commission.Requests
{
    public class GetPolicyCommissionRequest
    {
        public string ContractNumber { get; set; }
        public DateTime? DueDate { get; set; }
    }
}