using Newtonsoft.Json;
using System;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.DTO
{
    public class SetRiskCalculatedDataRequest
    {
        [JsonProperty("insuredId")]
        public int InsuredId { get; set; }

        [JsonProperty("riskCode")]
        public string RiskCode { get; set; }

        [JsonProperty("amount")]
        public Decimal Amount { get; set; }

        [JsonProperty("premium")]
        public Decimal Premium { get; set; }
    }
}
