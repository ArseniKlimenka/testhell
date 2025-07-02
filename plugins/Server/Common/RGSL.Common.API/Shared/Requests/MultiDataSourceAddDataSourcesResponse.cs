using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Requests
{
    public class MultiDataSourceAddDataSourcesResponse
    {
        [JsonProperty("resultData")]
        public JObject ResultData { get; set; }
        [JsonProperty("additionalDataSources")]
        public IList<MultiDataSourceResponseAdditionalDataSource> AdditionalDataSources { get; set; }
    }

    public class MultiDataSourceResponseAdditionalDataSource
    {
        [JsonProperty("dataSourceName")]
        public string DataSourceName { get; set; }
        [JsonProperty("response")]
        public JObject Response { get; set; }
    }
}