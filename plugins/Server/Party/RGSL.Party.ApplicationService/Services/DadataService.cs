using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Adacta.AdInsure.Framework.Core.ApplicationServices.Common;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Logging;
using Adacta.AdInsure.RGSL.Common.API.Constants;
using Adacta.AdInsure.RGSL.Party.API.Services;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Adacta.AdInsure.RGSL.Party.ApplicationServices.Services
{
    public class DadataService : ApplicationServiceBase, IDadataService
    {
        #region private

        private readonly HttpClient _httpClient;
        private readonly IDadataSettings _dadataSettings;
        private readonly Lazy<ILogger> _logger = new Lazy<ILogger>(() => LogManagerAccessor.GetLogger(LogConstants.DadataIntegration));

        #endregion

        #region .ctor

        public DadataService(IDadataSettings dadataSettings, HttpClient httpClient)
            : base(AdInsureModule.PAS.ToString())
        {
            _dadataSettings = dadataSettings;
            _httpClient = httpClient;
        }

        #endregion

        #region IScoringIntegrationService

        public async Task<JsonObject> GetAddress(string requestQuery)
        {
            try
            {
                if (!_dadataSettings.EnableDadataService)
                {
                    _logger.Value.LogTrace("Dadata value is disabled. Check implSettings.json file");
                    return null;
                }

                HttpResponseMessage response;

                var requestObj = new { query = requestQuery };
                var resquestString = JsonConvert.SerializeObject(requestObj);
                var requestContent = new StringContent(resquestString, Encoding.UTF8, "application/json");
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Token", _dadataSettings.Token);
                _logger.Value.LogTrace("Calling Dadata service");
                response = await _httpClient.PostAsync(new Uri(_dadataSettings.Uri.ToString().TrimEnd('/')), requestContent);
                string result = await response.Content.ReadAsStringAsync();
                _logger.Value.LogTrace("Recieved answer from Dadata service: {0}", result);

                if (!response.IsSuccessStatusCode)
                {
                    _logger.Value.LogError(result);
                    throw new Exception("Dadata service didn`t return response");
                }

                return new JsonObject(result);
            }
            catch (Exception e)
            {
                _logger.Value.LogError(e, e.Message);
                throw;
            }
        }

        #endregion
    }
}
