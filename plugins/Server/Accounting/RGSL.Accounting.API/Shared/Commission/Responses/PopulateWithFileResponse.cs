using Newtonsoft.Json;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Responses
{
    public class PopulateWithFileResponse
    {
        [JsonProperty("totalFileItemsCount")]
        public int TotalFileItemsCount { get; set; }
        [JsonProperty("processedCount")]
        public int ProcessedCount { get; set; }
    }
}
