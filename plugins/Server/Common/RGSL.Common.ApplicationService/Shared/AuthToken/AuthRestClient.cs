using Adacta.AdInsure.Framework.Core.Logging;
using Adacta.AdInsure.RGSL.Common.API.Shared.AuthToken;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Adacta.AdInsure.RGSL.Common.API.Constants;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Settings;
using Adacta.AdInsure.RGSL.Framework.API.Extensions;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Common.ApplicationServices.Shared.AuthToken
{
    public class AuthRestClient : IAuthGateway
    {
        private readonly HttpClient _client;
        private readonly ICommonIntegrationSettings _settings;
        private readonly Lazy<ILogger> _logger;

        public AuthRestClient(ICommonIntegrationSettings settings)
        {
            _settings = settings;
            _client = CreateClient();

            _logger = new Lazy<ILogger>(() => LogManagerAccessor.GetLogger(LogConsts.ServerAuthTokenIntegration));
        }

        public async Task<(string, int)> AuthenticateAsync()
        {
            var content = new FormUrlEncodedContent(new Dictionary<string, string>
                {
                    { "grant_type", "client_credentials" },
                    { "client_id", _settings.AuthServiceClientId },
                    { "client_secret", _settings.AuthServiceClientSecret },
                    { "scope", _settings.AuthServiceScope }
                });

            var authResponse = await _client.PostAsync(new Uri(_settings.OAuthIdentityUrl + "/protocol/openid-connect/token"), content).ConfigureAwait(false);

            CheckOrThrow(authResponse);

            string responseContent = await authResponse.Content.ReadAsStringAsync().ConfigureAwait(false);

            return ParseTokenOrThrow(responseContent);
        }

        private (string, int) ParseTokenOrThrow(string responseContent)
        {
            JObject authResult = JObject.Parse(responseContent);
            string token = authResult.GetStringOrNull("access_token");

            if (token == null)
            {
                string message = $"Failed to parse auth token. Received response content: {responseContent}";

                _logger.Value.LogError(message);

                throw new Exception(message);
            }

            if (!int.TryParse(authResult.GetStringOrNull("expires_in"), out int expire))
            {
                string message = $"Failed to parse auth token expiration. Received response content: {responseContent}";

                _logger.Value.LogError(message);

                throw new Exception(message);
            }

            return (token, expire);
        }

        private void CheckOrThrow(HttpResponseMessage response)
        {
            if (response.IsSuccessStatusCode)
                return;

            string message = $"Auth service responded with {response.StatusCode}:{response.ReasonPhrase} when requested auth token.";

            _logger.Value.LogError($"{message}{Environment.NewLine}Response:{Environment.NewLine}{JsonConvert.SerializeObject(response)}");

            throw new Exception(message);
        }

        private static HttpClient CreateClient()
        {
            var client = new HttpClient();

            return client;
        }
    }
}
