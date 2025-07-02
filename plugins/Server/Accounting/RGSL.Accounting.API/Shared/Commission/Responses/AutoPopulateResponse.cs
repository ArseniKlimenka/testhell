using Newtonsoft.Json;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Responses
{
    public class AutoPopulateResponse
    {
        [JsonProperty("affectedCount")]
        public int AffectedCount { get; set; }
    }
}
