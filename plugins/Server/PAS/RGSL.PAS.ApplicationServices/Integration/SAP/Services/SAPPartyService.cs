using Adacta.AdInsure.RGSL.Common.API.Constants;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Settings;
using Adacta.AdInsure.RGSL.PAS.API.Integration.SAP.DTO;
using Adacta.AdInsure.RGSL.PAS.API.Integration.SAP.Services;
using Adacta.AdInsure.RGSL.PAS.Domain.Integration.SAP.Interfaces;
using Newtonsoft.Json.Linq;
using System;
using System.Text;
using System.Xml;

namespace Adacta.AdInsure.RGSL.PAS.ApplicationServices.Integration.SAP.Services
{
    public class SAPPartyService : ISAPPartyService
    {
        #region private
        private readonly ICommonIntegrationSettings _settings;
        private readonly ISAPProxyDomainService _domainProxyService;

        private readonly string _createPartyMethodId;
        private readonly string _updatePartyMethodId;

        #endregion

        #region .ctor
        public SAPPartyService(ICommonIntegrationSettings settings, ISAPProxyDomainService domainProxyService)
        {
            _settings = settings;
            _domainProxyService = domainProxyService;

            _createPartyMethodId = "Zerluapi000000000100";
            _updatePartyMethodId = "Zerluapi000000000172";
        }
        #endregion

        public SAPIntegrationResponse CreateParty(string request)
        {
            var result = new SAPIntegrationResponse
            {
                LoadedOnDate = DateTime.Now
            };

            // create party
            result.MethodName = _createPartyMethodId;
            var createPartyResponce = _domainProxyService.CallSAPService(
                request,
                _createPartyMethodId,
                _settings.SAPCreatePartyUrl,
                _settings.SAPLogin,
                _settings.SAPPassword
            );

            if (createPartyResponce.Status == ServerResponseStatus.Error)
            {
                result.ErrorMesages = createPartyResponce.ResponseBody;
                result.Status = ServerResponseStatus.Error;
                return result;
            }

            // read and parse SAP service response
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(createPartyResponce.ResponseBody);

            // take the created party ID
            var createdPartyId = doc.GetElementsByTagName("Epartnen")[0].FirstChild.InnerText;
            var isPartyCreated = createdPartyId != "000000000";

            // take array of messages
            var errorMessagesNode = doc.GetElementsByTagName("EtReturn")[0];
            
            // take responses ids and find the one with code = 039 or 088 which tells that party exists
            var existingPartyID = "";
            foreach (XmlNode item in errorMessagesNode.ChildNodes)
            {
                if (item.SelectNodes("Msgno")[0].InnerText == "039" || item.SelectNodes("Msgno")[0].InnerText == "088")
                {
                    existingPartyID = item.SelectNodes("Msgv1")[0].InnerText;
                }
            }

            // check if party is created
            if (!isPartyCreated)
            {
                // check if it already exists
                if (String.IsNullOrEmpty(existingPartyID))
                {
                    // put existingPartyID to the request body
                    // which is required for update
                    JObject requestToJson = JObject.Parse(request);
                    requestToJson["IsPars"]["Partnen"] = existingPartyID;

                    // update party
                    result.MethodName = _updatePartyMethodId;
                    createPartyResponce = _domainProxyService.CallSAPService(
                        requestToJson.ToString(),
                        _updatePartyMethodId,
                        _settings.SAPCreatePartyUrl,
                        _settings.SAPLogin,
                        _settings.SAPPassword
                    );

                    if (createPartyResponce.Status == ServerResponseStatus.Error)
                    {
                        result.ErrorMesages = createPartyResponce.ResponseBody;
                        result.Status = ServerResponseStatus.Error;

                        return result;
                    }
                }
            }

            // read final response to collect error messages
            XmlDocument responce = new XmlDocument();
            responce.LoadXml(createPartyResponce.ResponseBody);
            errorMessagesNode = responce.GetElementsByTagName("EtReturn")[0];
            StringBuilder msgs = new StringBuilder();
            foreach (XmlNode item in errorMessagesNode.ChildNodes)
            {
                msgs.Append(item.SelectNodes("Msgtext")[0].InnerText + "; ");
            }

            // form final result data
            result.ResultEntityId = isPartyCreated ? createdPartyId : existingPartyID;
            result.Status = ServerResponseStatus.Success;
            result.ErrorMesages = msgs.ToString();
            return result;
        }
    }
}