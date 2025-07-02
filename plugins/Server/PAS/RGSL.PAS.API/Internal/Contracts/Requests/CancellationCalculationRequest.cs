using Adacta.AdInsure.Framework.Core.Common;
using Newtonsoft.Json;

namespace Adacta.AdInsure.RGSL.PAS.API.Internal.Contracts.Requests
{
    public class CancellationCalculationRequest
    {
        [JsonProperty("contractNumber")]
        public string ContractNumber { get; set; }

        [JsonProperty("amendmentNumber")]
        public string AmendmentNumber { get; set; }

        [JsonProperty("body")]
        public JsonObject Body { get; set; }
    }
}
