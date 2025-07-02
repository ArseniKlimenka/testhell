using Adacta.AdInsure.Framework.Core.ConfigurationSettings.Providers;
using Adacta.AdInsure.Framework.Core.Logging;
using Adacta.AdInsure.RGSL.Common.API.Constants;
using Adacta.AdInsure.RGSL.Common.API.Shared.Requests;
using Adacta.AdInsure.RGSL.Common.API.Shared.Services;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text;
using System.Xml.Linq;

namespace Adacta.AdInsure.RGSL.Common.ApplicationServices.Shared.Services
{
    public class XmlRequestServiceAppRGSL : IXmlRequestServiceAppRGSL
    {
        private static int _counter = 0;
        private readonly Lazy<ILogger> _logger = new Lazy<ILogger>(() => LogManagerAccessor.GetLogger(LogConstants.XmlRequestService));
        private readonly long _maxRequestBodySize;

        public XmlRequestServiceAppRGSL()
        {
            var configurationManagerSettingsProvider = new ConfigurationManagerSettingsProvider();
            _maxRequestBodySize = configurationManagerSettingsProvider.GetAppSetting("AdInsure:Settings:MaxRequestBodySize", defaultValue: 30000000);
        }

        public object PostXmlRequest(PostXmlRequestRequest request)
        {
            int requestId = ++_counter;
            string text = GetRequestMessage(requestId, request);

            _logger.Value.LogInformation(text);

            var doc = PostXml(request);

            _logger.Value.LogInformation(GetResponceMessage(requestId, doc.ToString()));

            string json = JsonConvert.SerializeXNode(doc);
            JObject o = JObject.Parse(json);
            JToken token = request.QueryPath == null ? o.First : o.SelectToken(request.QueryPath);

            if (!request.Iterable)
            {
                return token;
            }

            if (token == null)
            {
                return new List<object>();
            }

            if (token.Type == JTokenType.Array)
            {
                return new List<object>(token);
            }
            else
            {
                return new List<object> { token };
            }
        }

        private static string GetRequestMessage(int requestId, PostXmlRequestRequest request)
        {
            return "REQUEST (" + requestId.ToString(CultureInfo.InvariantCulture) + ")" + Environment.NewLine +
                "baseAddress: " + request.BaseAddress.ToString() + Environment.NewLine +
                "requestUri: " + request.RequestUri.ToString() + Environment.NewLine +
                "user: " + request.User + Environment.NewLine +
                "iterable: " + request.Iterable.ToString(CultureInfo.InvariantCulture) + Environment.NewLine +
                "content: " + request.Content;
        }

        private static string GetResponceMessage(int requestId, string text)
        {
            return "RESPONCE (" + requestId.ToString(CultureInfo.InvariantCulture) + "): " + text;
        }

        private XDocument PostXml(PostXmlRequestRequest request)
        {
            using HttpClient client = new HttpClient();
            client.MaxResponseContentBufferSize = _maxRequestBodySize;

            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/xml"));

            client.BaseAddress = request.BaseAddress;

            using var content = new StringContent(request.Content, Encoding.UTF8, MediaTypeNames.Application.Xml);

            using HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, request.RequestUri);
            httpRequestMessage.Content = content;
            httpRequestMessage.Headers.Authorization = new AuthenticationHeaderValue(
                scheme: "Basic",
                parameter: Convert.ToBase64String(Encoding.UTF8.GetBytes(request.User + ":" + request.Password))
            );

            var result = client.Send(httpRequestMessage);

            if (result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                using var stream = result.Content.ReadAsStream();
                var doc = XDocument.Load(stream);
                return doc;
            }
            else
            {
                try
                {
                    using var stream = result.Content.ReadAsStream();
                    using var reader = new StreamReader(stream, Encoding.UTF8);
                    string response = reader.ReadToEnd();
                    throw new HttpRequestException(response, null, result.StatusCode);
                }
                catch
                {
                    throw new HttpRequestException(result.ReasonPhrase, null, result.StatusCode);
                }
            }
        }
    }
}
