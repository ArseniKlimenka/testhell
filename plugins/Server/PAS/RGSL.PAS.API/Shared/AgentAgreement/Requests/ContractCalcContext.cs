using Newtonsoft.Json;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Requests
{
    public class ContractCalcContext
    {
        [JsonProperty("insuranceRule")]
        public string InsuranceRule { get; set; }

        [JsonProperty("insuranceProduct")]
        public string InsuranceProduct { get; set; }

        [JsonProperty("insuranceCurrency")]
        public string InsuranceCurrency { get; set; }

        [JsonProperty("insuranceTerm")]
        public int InsuranceTerm { get; set; }

        [JsonProperty("premiumPeriod")]
        public int PremiumPeriod { get; set; }

        [JsonProperty("premiumPeriodType")]
        public string PremiumPeriodType { get; set; }

        [JsonProperty("manualRule", NullValueHandling = NullValueHandling.Ignore)]
        public string ManualRule { get; set; }

        [JsonProperty("insuranceYear")]
        public int InsuranceYear { get; set; }

        [JsonProperty("creditProgram", NullValueHandling = NullValueHandling.Ignore)]
        public string CreditProgram { get; set; }

        [JsonProperty("variant", NullValueHandling = NullValueHandling.Ignore)]
        public string Variant { get; set; }
    }
}
