using Adacta.AdInsure.Framework.Core.ApplicationContext;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.DataSource.Services;
using Adacta.AdInsure.RGSL.Common.API.Shared.Requests;
using Adacta.AdInsure.RGSL.Common.API.Shared.Services;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Common.ApplicationServices.Shared.Services
{
    public class MultiDataSourceRGSL : IMultiDataSourceRGSL
    {
        private readonly IDataSourceService _dataSourceService;

        public MultiDataSourceRGSL(IDataSourceService dataSourceService)
        {
            _dataSourceService = dataSourceService;
        }

        public async Task<IEnumerable<MultiDataSourceAddDataSourcesResponse>> ExecuteWithAdditionaldDataSources(MultiDataSourceAddDataSourcesRequest request)
        {
            var additionalDataSources = new List<MultiDataSourceResponseAdditionalDataSource>(request.AdditionalDataSources.Count);
            JsonObject data = await ExecuteDataSource(request.DataSourceName, request.Request);
            var items = data.GetJsonPropertyAsObject("data").ParsedJArray;

            if (items.Any())
            {
                foreach (var requestItem in request.AdditionalDataSources)
                {
                    JsonObject response = await ExecuteDataSource(requestItem.DataSourceName, requestItem.Request);
                    additionalDataSources.Add(new MultiDataSourceResponseAdditionalDataSource
                    {
                        DataSourceName = requestItem.DataSourceName,
                        Response = response.ParsedJson,
                    });
                }
            }

            return items.Select(_ => {
                JToken t = _.SelectToken("resultData");
                return new MultiDataSourceAddDataSourcesResponse
                {
                    ResultData = (JObject) t,
                    AdditionalDataSources = additionalDataSources,
                };
                });
        }

        public IEnumerable<MultiDataSourceAddDataSourcesResponse> ExecuteWithAdditionaldDataSourcesSync(MultiDataSourceAddDataSourcesRequest request)
        {
            var additionalDataSources = new List<MultiDataSourceResponseAdditionalDataSource>(request.AdditionalDataSources.Count);
            JsonObject data = ExecuteDataSource(request.DataSourceName, request.Request).GetAwaiter().GetResult();
            var items = data.GetJsonPropertyAsObject("data").ParsedJArray;

            if (items.Any())
            {
                foreach (var requestItem in request.AdditionalDataSources)
                {
                    JsonObject response = ExecuteDataSource(requestItem.DataSourceName, requestItem.Request).GetAwaiter().GetResult();
                    additionalDataSources.Add(new MultiDataSourceResponseAdditionalDataSource
                    {
                        DataSourceName = requestItem.DataSourceName,
                        Response = response.ParsedJson,
                    });
                }
            }

            return items.Select(_ => {
                JToken t = _.SelectToken("resultData");
                return new MultiDataSourceAddDataSourcesResponse
                {
                    ResultData = (JObject) t,
                    AdditionalDataSources = additionalDataSources,
                };
            });
        }

        private async Task<JsonObject> ExecuteDataSource(string dataSourceName, JObject request)
        {
            var serviceRequest = new JObject();
            var data = new JObject(request);
            serviceRequest.Add("data", data);
            var r = new JsonObject(serviceRequest);

            var response = await _dataSourceService.ExecuteAsync(dataSourceName, r, false);
            return response;
        }
    }
}
