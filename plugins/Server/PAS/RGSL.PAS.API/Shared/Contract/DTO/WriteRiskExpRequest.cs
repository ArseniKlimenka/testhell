using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.DTO
{
    public class WriteRiskExpRequest
    {
        [JsonProperty("risks")]
        public List<RiskExpData> Risks { get; set; }
    }

    public class RiskExpData
    {
        [JsonProperty("insuredId")]
        public int InsuredId { get; set; }

        [JsonProperty("contractNumber")]
        public string ContractNumber { get; set; }

        [JsonProperty("riskCode")]
        public string RiskCode { get; set; }

        [JsonProperty("reinsRate")]
        public Decimal ReinsRate { get; set; }

        [JsonProperty("reinsPremium")]
        public Decimal ReinsPremium { get; set; }
    }
}
