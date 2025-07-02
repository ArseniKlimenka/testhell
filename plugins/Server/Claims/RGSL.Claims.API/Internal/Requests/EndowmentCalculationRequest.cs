using Adacta.AdInsure.Framework.Core.Common;
using Newtonsoft.Json;

namespace Adacta.AdInsure.RGSL.Claims.API.Internal.Requests
{
    public class EndowmentCalculationRequest
    {
        [JsonProperty("endowmentNumber")]
        public string EndowmentNumber { get; set; }

        [JsonProperty("body")]
        public JsonObject Body { get; set; }
    }
}
