using Adacta.AdInsure.Framework.Core.Common;
using Newtonsoft.Json;
using System;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Requests
{
    public class CommCalcRequest
    {
        [JsonProperty("originDocumentId")]
        public string OriginDocumentId { get; set; }

        [JsonProperty("originDocumentNumber")]
        public string OriginDocumentNumber { get; set; }

        [JsonProperty("contractNumber")]
        public string ContractNumber { get; set; }

        [JsonProperty("serviceProviderCode")]
        public string ServiceProviderCode { get; set; }

        [JsonProperty("calculationDate")]
        [JsonConverter(typeof(DateOnlyDateTimeConverter))]
        public DateTime CalculationDate { get; set; }

        [JsonProperty("loggingEnabled")]
        public bool LoggingEnabled { get; set; }

        [JsonProperty("calculationContext")]
        public ContractCalcContext CalculationContext { get; set; }
    }
}
