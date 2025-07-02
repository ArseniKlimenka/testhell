using Newtonsoft.Json;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Responses
{
    public class CommissionActCreateResponse
    {
        [JsonProperty("actId")]
        public long ActId { get; set; }
    }
}
