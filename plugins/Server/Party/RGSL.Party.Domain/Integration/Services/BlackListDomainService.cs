using System;
using Adacta.AdInsure.RGSL.Party.API.DTO;
using Adacta.AdInsure.RGSL.Party.API.Services;
using Adacta.AdInsure.RGSL.Party.Domain.Integration.Interfaces;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text.RegularExpressions;
using System.Xml;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Settings;
using RestSharp;
using System.Globalization;
using Adacta.AdInsure.Framework.Core.Logging;
using Adacta.AdInsure.RGSL.Common.API.Constants;
using System.Linq;
using System.Xml.Linq;
using System.Diagnostics;
using System.Threading.Tasks;
using RestSharp.Authenticators;
using Ninject.Activation;
using System.Net;

namespace Adacta.AdInsure.RGSL.Party.Domain.Integration.Services
{
    public class BlackListDomainService : IBlackListDomainService
    {

        private readonly Common.API.Shared.AuthToken.IAuthenticator _authenticator;
        private readonly ICommonIntegrationSettings _settings;
        private readonly Lazy<ILogger> _logger;
        private RestClient _client;

        public BlackListDomainService(Common.API.Shared.AuthToken.IAuthenticator authenticator,
            ICommonIntegrationSettings settings)
        {
            _authenticator = authenticator;
            _logger = new Lazy<ILogger>(() => LogManagerAccessor.GetLogger(LogConstants.KPKIntegration));
            _settings = settings;
            _client = new RestClient(_settings.BlackListUrl);
        }

        public string CallBlackListDomainService(string request)
        {
            _logger.Value.LogDebug("CheckBlackLists - settings.BlackListUrl: {0}", _settings.BlackListUrl);

            if (_settings.EnableBlackListService == false)
            {
                _logger.Value.LogDebug("CheckBlackLists - fakeGoodResponse");
                var fakeGoodResponse = new GetContractorsResponse();
                fakeGoodResponse.Error = "false";
                fakeGoodResponse.Reject = "false";
                fakeGoodResponse.Agreement = "";
                fakeGoodResponse.Reason = "";
                return JsonConvert.SerializeObject(fakeGoodResponse);
            }

            try
            {
                _logger.Value.LogDebug("CheckBlackLists - request: {0}", request);
                var soapResponse = CallWebService(request);
                var cleanSoap = SOAPTrim(soapResponse);
                var response = ConvertSoapToJson(cleanSoap);
                return JsonConvert.SerializeObject(response);
            }
            catch (Exception e)
            {
                _logger.Value.LogError(e, e.Message);
                var exceptionResponse = new GetContractorsResponse();
                exceptionResponse.Error = "true";
                return JsonConvert.SerializeObject(exceptionResponse);
            }
        }

        private GetContractorsResponse ConvertSoapToJson(string cleanSoap)
        {
            var response = new GetContractorsResponse();

            response.Agreement = Regex.Match(cleanSoap, @"(?<=<Agreement>)(.*)(?=</Agreement>)", RegexOptions.CultureInvariant).ToString();
            response.Reason = Regex.Match(cleanSoap, @"(?<=<Reason>)(.*)(?=</Reason>)", RegexOptions.CultureInvariant).ToString();
            response.Reject = Regex.Match(cleanSoap, @"(?<=<Reject>)(.*)(?=</Reject>)", RegexOptions.CultureInvariant).ToString();
            response.Error = Regex.Match(cleanSoap, @"(?<=<Error>)(.*)(?=</Error>)", RegexOptions.CultureInvariant).ToString();

            if(_logger.Value.IsEnabled(LogLevel.Debug))
            {
                _logger.Value.LogDebug("GetBlackList  - result clear json: {0}", JsonConvert.SerializeObject(response));
            }
            
            return response;
        }

        private string SOAPTrim(string soap)
        {
            string cleanPattern = @"\sxmlns:soap=""(.*?)""|\sxmlns:m=""(.*?)""|\sxmlns:xs=""(.*?)""|\sxmlns:xsi=""(.*?)""|\sxmlns=""(.*?)""|soap:|m:";
            Regex regClean = new Regex(cleanPattern, RegexOptions.CultureInvariant);

            var clean = regClean.Replace(soap, "");
            _logger.Value.LogDebug("CheckBlackLists - result after regClean: {0}", clean);

            return clean;
        }

        private string CallWebService(string requerstBody)
        {
            JObject requerstBodyToJson = JObject.Parse(requerstBody);
            requerstBodyToJson["_BaseID"] = _settings.BlackListLogin;

            var soapEnvelopeXml = JsonConvert.DeserializeXmlNode(requerstBodyToJson.ToString(), "_Data");
            var requestWithReplacedPrefixes = ReplacePrefixes(soapEnvelopeXml.OuterXml);
            var soapRequest = AddHeaders(requestWithReplacedPrefixes);

            _logger.Value.LogDebug("CheckBlackLists - full request: {0}", soapRequest.OuterXml);
            
            RestRequest request = new RestRequest(string.Empty, Method.Post)
            {
                RequestFormat = DataFormat.Xml
            };
            request.AddHeader("Content-Type", "text/xml; charset=utf-8");
            request.AddParameter("text/xml", soapRequest, ParameterType.RequestBody);

            // authentification
            if (string.IsNullOrEmpty(_settings.BlackListLogin))
            {
                var token = "Bearer " + _authenticator.GetToken().Result;
                request.AddHeader("Authorization", token);
            }
            else
            {
                request.Authenticator = new HttpBasicAuthenticator(_settings.BlackListLogin, _settings.BlackListPassword);
            }

            var response = _client.Execute(request);

            return response.Content;
        }

        private static XmlDocument AddHeaders(string body)
        {
            XmlDocument document = new XmlDocument();
            document.LoadXml($@"<soap:Envelope xmlns:soap=""http://www.w3.org/2003/05/soap-envelope"" xmlns:blac=""http://www.ads-soft.ru/ws_kpk/BlackListAgreement"" xmlns:blac1=""http://www.ads-soft.ru/ws_kpk/BlackList"">
               <soap:Header/>
                  <soap:Body>
                    <blac:CheckBlackListAgreement>
                        {body}
                    </blac:CheckBlackListAgreement>
                </soap:Body>
            </soap:Envelope>");
            return document;
        }


        private static string ReplacePrefixes(string body)
        {
            Regex openBlac1 = new Regex(@"<__");
            Regex closeBlac1 = new Regex(@"</__");
            Regex openBlac = new Regex(@"<_");
            Regex closeBlac = new Regex(@"</_");

            body = openBlac1.Replace(body, "<blac1:");
            body = closeBlac1.Replace(body, "</blac1:");
            body = openBlac.Replace(body, "<blac:");
            body = closeBlac.Replace(body, "</blac:");

            return body;
        }

    }
}
