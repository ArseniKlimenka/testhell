using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.DTO
{
    public class WriteRiskRequest
    {
        [JsonProperty("risks")]
        public List<RiskData> Risks { get; set; }
    }

    public class RiskData
    {
        [JsonProperty("insuredId")]
        public int InsuredId { get; set; }

        [JsonProperty("contractNumber")]
        public string ContractNumber { get; set; }

        [JsonProperty("startDate")]
        public DateTime StartDate { get; set; }

        [JsonProperty("endDate")]
        public DateTime EndDate { get; set; }

        [JsonProperty("riskCode")]
        public string RiskCode { get; set; }

        [JsonProperty("amount")]
        public Decimal Amount { get; set; }

        [JsonProperty("premium")]
        public Decimal Premium { get; set; }
    }
}
