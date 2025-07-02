using Newtonsoft.Json;
using System;

namespace Adacta.AdInsure.RGSL.PAS.API.Integration.Contracts.DTO
{
    public class ContractDataCustomRequest
    {
        [JsonProperty("policyHolderPartyCode")]
        public string PolicyHolderPartyCode { get; set; }

        [JsonProperty("getOnlyInsuredPerson")]
        public bool GetOnlyInsuredPerson { get; set; }

        [JsonProperty("reportDate")]
        public DateTime? ReportDate { get; set; }
    }
}
