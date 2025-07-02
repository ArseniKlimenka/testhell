using Adacta.AdInsure.RGSL.PAS.Domain.Integration.SAP.DTO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using RestSharp.Authenticators;
using System;
using System.Globalization;
using System.IO;
using System.Net;
using System.Text.RegularExpressions;
using System.Xml;
using Adacta.AdInsure.RGSL.Common.API.Constants;
using Adacta.AdInsure.RGSL.PAS.Domain.Integration.SAP.Interfaces;

namespace Adacta.AdInsure.RGSL.PAS.DomainService.Integration.SAP.Services
{
    public class SAPProxyDomainService : ISAPProxyDomainService
    {

        public SAPProxyResponse CallSAPService(
            string request,
            string webMethodId,
            Uri url,
            string sapLogin,
            string sapPassword
            )
        {
            // initialize web client
            RestClientOptions options = new()
            {
                BaseUrl = url,
                Authenticator = new HttpBasicAuthenticator(sapLogin, sapPassword)
            };
            RestClient client = new(options);

            // prepare prequest
            var soapAction = $"urn:sap-com:document:sap:soap:functions:mc-style:{webMethodId}_SRVC:{webMethodId}SrvcRequest";
            var soapRequest = PrepareSoapRequest(request, sapLogin, webMethodId);
            RestRequest req = new RestRequest(string.Empty, Method.Post);
            req.AddHeader("SOAPAction", soapAction);
            req.AddHeader("Content-Type", "application/soap+xml; charset=utf-8");
            req.AddParameter("application/soap+xml", soapRequest, ParameterType.RequestBody);

            // execute request
            var soapRespose = new SAPProxyResponse();
            try
            {
                var response = client.Execute(req);
                soapRespose.Status = ServerResponseStatus.Success;
                soapRespose.ResponseBody = response.Content.ToString(CultureInfo.InvariantCulture);
            }
            catch (WebException ex)
            {
                soapRespose.Status = ServerResponseStatus.Error;
                using (var stream = ex.Response.GetResponseStream())
                using (var reader = new StreamReader(stream))
                {
                    soapRespose.ResponseBody = reader.ReadToEnd();
                }
            }

            return soapRespose;
        }

        private static XmlDocument PrepareSoapRequest(string request, string sapLogin, string webMethodId)
        {
            // put SAP login into the request
            JObject json = JObject.Parse(request);
            json["IsUserData"]["ZexternUserId"] = sapLogin;

            // convert json body to xml
            var soapEnvelopeXml = JsonConvert.DeserializeXmlNode(json.ToString(), "Body");
            XmlDocument xd = new XmlDocument();
            xd.LoadXml(soapEnvelopeXml.InnerXml);
            string body = xd.DocumentElement.InnerXml;

            // add SOAP request wrappper
            XmlDocument document = new XmlDocument();
            document.LoadXml($@"<s:Envelope xmlns:s=""http://schemas.xmlsoap.org/soap/envelope/"">
	            <s:Body xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" xmlns:xsd=""http://www.w3.org/2001/XMLSchema"">
		            <{webMethodId}Srvc xmlns=""urn:sap-com:document:sap:soap:functions:mc-style"">
                        {body}
                    </{webMethodId}Srvc>
	            </s:Body>
            </s:Envelope>");
            return document;
        }
    }
}