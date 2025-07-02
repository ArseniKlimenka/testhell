using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Requests
{
    public class MultiDataSourceAddDataSourcesRequest
    {
        public string DataSourceName { get; set; }
        public JObject Request { get; set; }
        public IList<MultiDataSourceRequestAdditionalDataSource> AdditionalDataSources { get; set; }
    }

    public class MultiDataSourceRequestAdditionalDataSource
    {
        public string DataSourceName { get; set; }
        public JObject Request { get; set; }
    }
}