using Adacta.AdInsure.Framework.Core.Logging;
using Adacta.AdInsure.RGSL.Common.API.Constants;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Settings;
using Adacta.AdInsure.RGSL.Party.API.DTO;
using Adacta.AdInsure.RGSL.PAS.API.Integration.SendEvent.DTO;
using Adacta.AdInsure.RGSL.PAS.Domain.Integration.SendEvent.DTO;
using Adacta.AdInsure.RGSL.PAS.Domain.Integration.SendEvent.Interfaces;
using Adacta.AdInsure.RGSL.PAS.Domain.Integration.SendEvent.Repositories;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RestSharp;
using RestSharp.Authenticators;
using System;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Xml.Serialization;

namespace Adacta.AdInsure.RGSL.PAS.Domain.Integration.SendEvent.Services
{
    public class SendEventDomainService : ISendEventDomainService
    {
        private readonly ICommonIntegrationSettings _settings;
        private readonly ISendEventRepository _sendEventRepository;
        private readonly Lazy<ILogger> _logger = new Lazy<ILogger>(() => LogManagerAccessor.GetLogger(LogConstants.SendEvent));

        #region Consts

        private const string ELMA_365 = "ELMA365";
        private const string POLICY_HOLDER_CHECK = "POLICY_HOLDER_CHECK";
        private const string SPORTSMAN_CREATE = "SPORTSMAN_CREATE";
        private const string SPORTSMAN_DELETE = "SPORTSMAN_DELETE";
        private const string SEND_EVENT_SUCCESS_STATUS = "Success";
        private const string SEND_EVENT_KPK_STATUS = "NotificationReady";
        private const string SEND_EVENT_ERROR_STATUS = "Error";

        #endregion

        public SendEventDomainService(ISendEventRepository sendEventRepository, ICommonIntegrationSettings settings)
        {
            _sendEventRepository = sendEventRepository;
            _settings = settings;
        }

        public void SendEvent(SendEventDomainRequest request)
        {
            Log("Start with subscriber: {0}", request.Subscriber);

            var result = SendEventInternal(request);
            SetEventStatus(request, result);

            Log("End with subscriber: {0}", request.Subscriber);
        }

        public void SendEventStatusChange(SendEventStatusChangeRequest request)
        {
            Log("Start with sendEventId: {0}", request.SendEventId);

            SetEventStatusAfterNotificationSend(request);

            Log("End with sendEventId: {0}", request.SendEventId);
        }

        public void SendEventWriteError(SendEventStatusChangeRequest request)
        {
            Log("Start with sendEventId: {0}", request.SendEventId);

            SetEventErrorStatus(request);

            Log("End with sendEventId: {0}", request.SendEventId);
        }

        private ISendEventDomainResponse SendEventInternal(SendEventDomainRequest request)
        {
            if (request.Subscriber == "EFR")
            {
                // BAD SMELL!!!
                var response = SendEventUsingCurl(request);

                return response;
            }
            else
            {
                var response = SendEventUsingRestSharp(request);

                return response;
            }
        }

        private void SetEventStatus(SendEventDomainRequest request, ISendEventDomainResponse result)
        {
            var eventRequest = new EventDomainRequest()
            {
                NeedToSend = false,
                SendEventId = request.SendEventId,
                Status = result.Status,
                Response = result.Response
            };

            _sendEventRepository.SetEventStatus(eventRequest);
        }

        private void SetEventStatusAfterNotificationSend(SendEventStatusChangeRequest request)
        {
            var eventRequest = new EventDomainRequest()
            {
                NeedToSend = false,
                SendEventId = request.SendEventId,
                Status = SEND_EVENT_SUCCESS_STATUS,
                Response = request.Response
            };

            _sendEventRepository.SetEventStatus(eventRequest);
        }

        private void SetEventErrorStatus(SendEventStatusChangeRequest request)
        {
            var eventRequest = new EventDomainRequest()
            {
                NeedToSend = false,
                SendEventId = request.SendEventId,
                Status = SEND_EVENT_ERROR_STATUS,
                Response = request.Response
            };

            _sendEventRepository.SetEventStatus(eventRequest);
        }

        private static X509Certificate2 GetCertificate(SendEventDomainRequest request)
        {
            if (request.Subscriber == "EFR")
            {
                using var store = new X509Store(StoreName.My, StoreLocation.LocalMachine);
                store.Open(OpenFlags.ReadOnly);
                return store.Certificates.SingleOrDefault(_ => _.FriendlyName == "adins-tst-app-1.life.rgs.local");
            }

            return null;
        }

        private SendEventDomainResponse SendEventUsingCurl(SendEventDomainRequest request)
        {
            var result = new SendEventDomainResponse();

            try
            {
                var content = request.Request;
                content = content.Replace("\"1.0\"", "\\\"1.0\\\"", false, CultureInfo.InvariantCulture);
                content = content.Replace("\"UTF-8\"", "\\\"UTF-8\\\"", false, CultureInfo.InvariantCulture);
                var command = string.Format(CultureInfo.InvariantCulture, "{0} -d \"{1}\" --key {2} --cert {3} -k {4} --pass {5}", request.CurlPath, content, request.KeyPath, request.CertPath, request.Uri, request.PassPhrase);

                _logger.Value.LogError("SendEvent EFR command request: {0}", command);

                ProcessStartInfo procStartInfo = new ProcessStartInfo("cmd", string.Format(CultureInfo.InvariantCulture, "/c {0}", command))
                {
                    RedirectStandardOutput = true,
                    UseShellExecute = false,

                    CreateNoWindow = true,
                    StandardOutputEncoding = Encoding.GetEncoding(866)
                };

                Process proc = new Process
                {
                    StartInfo = procStartInfo
                };

                proc.Start();

                string curlResult = proc.StandardOutput.ReadToEnd();

                _logger.Value.LogError("SendEvent EFR command working directory: {0}", Environment.CurrentDirectory);
                _logger.Value.LogError("SendEvent EFR command response: {0}", curlResult);

                var serializer = new XmlSerializer(typeof(SendEventDomainResponse));
                using TextReader reader = new StringReader(curlResult);

                if (string.IsNullOrWhiteSpace(curlResult))
                {
                    result.Status = "Error";
                }
                else
                {
                    result = (SendEventDomainResponse) serializer.Deserialize(reader);
                }

                result.Response = curlResult;
            }
            catch (Exception ex)
            {
                _logger.Value.LogError("SendEvent is unsuccessfull. : {0} {1}", ex.Message, request.Request);

                result.Status = "Error";
                result.Response = ex.Message;
            }

            return result;
        }

        private void UpdateClientAutenticator(SendEventDomainRequest request, RestRequest restRequest)
        {
            switch (request.Subscriber)
            {
                case ELMA_365:
                    restRequest.Authenticator = new JwtAuthenticator(request.Token);

                    Log("request.Token: {0}", request.Token);

                    break;
                default:
                    restRequest.Authenticator = new HttpBasicAuthenticator(request.Login, request.Password);

                    Log("request.Login: {0}", request.Login);
                    Log("request.Password: {0}", request.Password);

                    break;
            }
        }

        private RestRequest CreateRestRequest(SendEventDomainRequest request)
        {
            string paramName = request.Subscriber switch
            {
                ELMA_365 => "text/json",
                SPORTSMAN_CREATE => "text/json",
                SPORTSMAN_DELETE => "text/json",
                _ => "text/xml",
            };

            RestSharp.Method requestMethod = request.Subscriber switch
            {
                SPORTSMAN_DELETE => Method.Delete,
                _ => Method.Post,
            };

            var restRequest = new RestRequest(string.Empty, requestMethod);

            UpdateClientAutenticator(request, restRequest);

            restRequest.AddHeader("Content-Type", $"{paramName}; charset=utf-8");

            restRequest.AddParameter(paramName, request.Request, ParameterType.RequestBody);

            return restRequest;
        }

        private static ISendEventDomainResponse DeserializeResponse(RestResponse response, string subscriber)
        {
            switch (subscriber)
            {
                case POLICY_HOLDER_CHECK:
                    return DeserializeKpkJsonResponse(response.Content);
                case ELMA_365:
                case SPORTSMAN_CREATE:
                case SPORTSMAN_DELETE:
                    return DeserializeJsonResponse(response.Content);
                default:
                    return DeserializeXmlResponse(response.Content);
            }
        }

        private static SendEventJsonDomainResponse DeserializeJsonResponse(string responseContent)
        {
            var result = JsonConvert.DeserializeObject<SendEventJsonDomainResponse>(responseContent);

            result.Status = result.Success ? "success" : "error";

            return result;
        }

        private static SendEventJsonDomainResponse DeserializeKpkJsonResponse(string responseContent)
        {
            var kpkResponse = JsonConvert.DeserializeObject<GetContractorsResponse>(responseContent);

            var status = GetKpkResponseStatus(kpkResponse);

            var result = new SendEventJsonDomainResponse()
            {
                Error = kpkResponse.Error,
                Response = responseContent,
                Success = string.IsNullOrEmpty(kpkResponse.Error),
                Status = status
            };

            return result;
        }

        private static string GetKpkResponseStatus(GetContractorsResponse response)
        {
            if (!string.IsNullOrEmpty(response.Error))
            {
                return SEND_EVENT_ERROR_STATUS;
            }
            else if (response.Reject.ToLower() == "true")
            {
                return SEND_EVENT_KPK_STATUS;
            }

            return SEND_EVENT_SUCCESS_STATUS;
        }

        private static SendEventDomainResponse DeserializeXmlResponse(string responseContent)
        {
            var serializer = new XmlSerializer(typeof(SendEventDomainResponse));

            using TextReader reader = new StringReader(responseContent);

            return (SendEventDomainResponse) serializer.Deserialize(reader);
        }

        private ISendEventDomainResponse SendEventUsingRestSharp(SendEventDomainRequest request)
        {

            Log("restClient.Url: {0}", request.Uri);

            RestClientOptions restClientOptions = new(request.Uri);

            var certificate = GetCertificate(request);
            if (certificate is not null)
            {
                restClientOptions.ClientCertificates =
                [
                    certificate
                ];
            }

            using RestClient restClient = new (restClientOptions);

            var restRequest = CreateRestRequest(request);

            var response = restClient.Execute(restRequest);

            ISendEventDomainResponse result;

            if (response.IsSuccessful)
            {
                result = DeserializeResponse(response, request.Subscriber);
            }
            else
            {
                result = new SendEventDomainResponse()
                {
                    Status = "Error"
                };

                _logger.Value.LogError("SendEvent is unsuccessfull. : {0} {1} {2}", response.StatusCode, response.ErrorMessage, request.Request);
            }

            result.Response = response.Content;

            restClient.Dispose();

            return result;
        }

        private void Log(string logMessage, object logValue = null)
        {
            if (_settings.SendEventEnableLogging)
            {
                _logger.Value.LogError(logMessage, logValue);
            }
        }
    }
}
