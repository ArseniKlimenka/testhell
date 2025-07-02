using Adacta.AdInsure.RGSL.Common.API.Shared.Integration.DTOs;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Settings;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Common.ApplicationServices.Shared.Services
{
    public class SecuritySmsGateway
    {
        const string SUBJECT = "RGS_Life";

        private static HttpClient _client;
        private readonly ICommonIntegrationSettings _settings;

        public SecuritySmsGateway(ICommonIntegrationSettings settings)
        {
            _settings = settings;
        }

        public Task<HttpResponseMessage> SendRequest(SecuritySmsSendIntegrationRequest request)
        {
            var parameters = new Dictionary<string, string>()
            {
                ["login"] = _settings.SmsServiceLogin,
                ["password"] = _settings.SmsServicePassword,
                ["subject"] = SUBJECT,
                ["address"] = request.PhoneNumber,
                ["text"] = request.Message
            };

            var httpRequestMessage = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new System.Uri(GetUriWithParametersg(_settings.SmsNotificationServiceUri, parameters)),
                Headers = {
                    { "ProductCode", request.ProductCode },
                    { "SourceType", request.SourceType}
                }
            };

            _client ??= new HttpClient();

            return _client.SendAsync(httpRequestMessage);
        }

        private static string GetUriWithParametersg(System.Uri uri, Dictionary<string, string> parameters)
        {
            bool startingQuestionMarkAdded = false;
            var sb = new StringBuilder(uri.OriginalString);
            foreach (var parameter in parameters)
            {
                if (parameter.Value == null) continue;
                sb.Append(startingQuestionMarkAdded ? '&' : '?');
                sb.Append(parameter.Key);
                sb.Append('=');
                sb.Append(parameter.Value);
                startingQuestionMarkAdded = true;
            }
            return sb.ToString();
        }
    }
}
