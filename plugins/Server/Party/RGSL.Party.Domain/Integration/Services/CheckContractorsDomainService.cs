using System;
using Adacta.AdInsure.RGSL.Party.API.DTO;
using Adacta.AdInsure.RGSL.Party.Domain.Integration.Interfaces;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Text.RegularExpressions;
using System.Xml;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Settings;
using RestSharp;
using Adacta.AdInsure.Framework.Core.Logging;
using Adacta.AdInsure.RGSL.Common.API.Constants;
using RestSharp.Authenticators;

namespace Adacta.AdInsure.RGSL.Party.Domain.Integration.Services
{
    public class CheckContractorsDomainService : ICheckContractorsDomainService
    {
        private readonly Common.API.Shared.AuthToken.IAuthenticator _authenticator;
        private readonly ICommonIntegrationSettings _settings;
        private readonly Lazy<ILogger> _logger;
        private RestClient _client;

        public CheckContractorsDomainService(Common.API.Shared.AuthToken.IAuthenticator authenticator,
            ICommonIntegrationSettings settings)
        {
            _authenticator = authenticator;
            _logger = new Lazy<ILogger>(() => LogManagerAccessor.GetLogger(LogConstants.KPKIntegration));
            _settings = settings;
            _client = new RestClient(_settings.CheckContractorsUrl);
        }

        public string CallCheckContractorsService(string request)
        {
            _logger.Value.LogDebug("CheckContractors - settings.CheckContractorsUrl: {0}", _settings.CheckContractorsUrl);

            try
            {
                _logger.Value.LogDebug("CheckContractors - request: {0}", request);
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

        private string CallWebService(string requerstBody)
        {
            var soapEnvelopeXml = JsonConvert.DeserializeXmlNode(requerstBody, "Contractors");
            var withPrefix = ReplacePrefixes(soapEnvelopeXml.OuterXml);
            var soapRequest = AddHeaders(withPrefix);

            _logger.Value.LogDebug("CheckContractors - full request: {0}", soapRequest.OuterXml);

            RestRequest request = new(string.Empty, Method.Post)
            {
                RequestFormat = DataFormat.Xml
            };
            request.AddHeader("Content-Type", "text/xml; charset=utf-8");
            request.AddParameter("text/xml", soapRequest, ParameterType.RequestBody);


            // authentification
            if (string.IsNullOrEmpty(_settings.CheckContractorsLogin))
            {
                var token = "Bearer " + _authenticator.GetToken().Result;
                request.AddHeader("Authorization", token);
            }
            else
            {
                request.Authenticator = new HttpBasicAuthenticator(_settings.CheckContractorsLogin, _settings.CheckContractorsPassword);
            }

            var response = _client.Execute(request);

            return response.Content;
        }


        private GetContractorsResponse ConvertSoapToJson(string cleanSoap)
        {
            _logger.Value.LogDebug("GetContractors clear xml: {0}", cleanSoap);

            var response = new GetContractorsResponse();

            response.Agreement = Regex.Match(cleanSoap, @"(?<=<Agreement>)(.*)(?=</Agreement>)", RegexOptions.CultureInvariant).ToString();
            response.Reason = Regex.Match(cleanSoap, @"(?<=<Reason>)(.*)(?=</Reason>)", RegexOptions.CultureInvariant).ToString();
            response.Reject = Regex.Match(cleanSoap, @"(?<=<Reject>)(.*)(?=</Reject>)", RegexOptions.CultureInvariant).ToString();
            response.Error = Regex.Match(cleanSoap, @"(?<=<Error>)(.*)(?=</Error>)", RegexOptions.CultureInvariant).ToString();

            return response;
        }

        private string SOAPTrim(string soap)
        {
            string cleanPattern = @"\sxmlns:soap=""(.*?)""|\sxmlns:m=""(.*?)""|\sxmlns:xs=""(.*?)""|\sxmlns:xsi=""(.*?)""|\sxmlns=""(.*?)""|soap:|m:";
            Regex regClean = new Regex(cleanPattern, RegexOptions.CultureInvariant);

            var clean = regClean.Replace(soap, "");
            _logger.Value.LogDebug("GetContractors after regClean: {0}", clean);

            return clean;
        }

        private static XmlDocument AddHeaders(string body)
        {
            XmlDocument document = new XmlDocument();
            document.LoadXml($@"<soap:Envelope xmlns:soap=""http://www.w3.org/2003/05/soap-envelope"" xmlns:chec=""http://www.ads-soft.ru/ws_kpk/CheckData"" xmlns:con=""http://www.ads-soft.ru/ws_kpk/Contractors"">
                    <soap:Header/>
                    <soap:Body>
                        <chec:GetContractors>
                            {body}
                        </chec:GetContractors>
                    </soap:Body>
                    </soap:Envelope>");
            return document;
        }

        private static string ReplacePrefixes(string body)
        {
            Regex open = new Regex(@"<");
            Regex close = new Regex(@"<con:/");
            body = open.Replace(body, "<con:");
            return close.Replace(body, "</con:");
        }

    }
}