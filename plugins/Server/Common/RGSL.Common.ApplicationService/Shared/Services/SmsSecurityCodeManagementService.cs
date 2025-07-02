using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.Framework.Core.Logging;
using Adacta.AdInsure.RGSL.Common.API.Constants;
using Adacta.AdInsure.RGSL.Common.API.Shared.Constants;
using Adacta.AdInsure.RGSL.Common.API.Shared.Integration.DTOs;
using Adacta.AdInsure.RGSL.Common.API.Shared.Services;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Settings;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.SmsSecurity;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.SmsSecurity.Repositories;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Common.ApplicationServices.Shared.Services
{
    public class SmsSecurityCodeManagementService : ISmsSecurityCodeManagementService
    {
        private readonly SecuritySmsGateway _gateway;
        private readonly ISecuritySmsNotificationRepository _repository;
        private readonly Lazy<ILogger> _logger = new Lazy<ILogger>(() => LogManagerAccessor.GetLogger(LogConstants.SmsSecurityCodeManagement));
        private readonly ICommonIntegrationSettings _settings;
        private string _currentSecurityCode;
        private const int minCodeLength = 4;
        private const int maxCodeLength = 12;

        public SmsSecurityCodeManagementService(SecuritySmsGateway gateway,
                                                ISecuritySmsNotificationRepository repository,
                                                ICommonIntegrationSettings settings)
        {
            _gateway = gateway;
            _repository = repository;
            _currentSecurityCode = string.Empty;
            _settings = settings;
        }

        public async Task<SecuritySmsSendResponse> SendSecuritySms(SecuritySmsSendRequest request)
        {
            var response = await SendSecuritySmsAndSaveResult(request);
            return response;
        }

        private async Task<SecuritySmsSendResponse> SendSecuritySmsAndSaveResult (SecuritySmsSendRequest request)
        {
            var lastNotification = _repository.GetLastNotificationData(request.ReferenceNumber, request.PartyCode, request.SmsTypeCode);
            var currentTime = DateTime.Now;
            

            if (lastNotification != null)
            {
                var minutesFromLastNotification = (int) (currentTime - lastNotification.NotificationDate).TotalMinutes;

                if (minutesFromLastNotification < _settings.SecurityCodeCooldownInMinutes)
                {
                    var coolDownExpiresInMinutes = _settings.SecurityCodeCooldownInMinutes - minutesFromLastNotification;
                    return new SecuritySmsSendResponse() { IsOnCooldown = true, CooldownMinutes = coolDownExpiresInMinutes };
                }
            }

            var result = await SendSecuritySms(request);

            if (string.IsNullOrEmpty(result))
            {
                _logger.Value.LogDebug("Sms integration returned empty result.");
                return new SecuritySmsSendResponse();
            }

            var resultItems = result.Split(';');
            var smsStatus = resultItems.Any() ? resultItems[0] : string.Empty;

            if (smsStatus.ToUpperInvariant() != "OK")
            {
                _logger.Value.LogDebug("Sms has not been sent. Sms status: {0}", smsStatus);
                return new SecuritySmsSendResponse();
            }

            var sendDate = DateTime.Now;
            SaveNotificationInfo(request, resultItems, sendDate);
            _currentSecurityCode = string.Empty;
            return new SecuritySmsSendResponse() { IsSent = true, SendDate = sendDate };

            async Task<string> SendSecuritySms(SecuritySmsSendRequest request)
            {
                if (request == null ||
                    string.IsNullOrEmpty(request.PartyCode) ||
                    string.IsNullOrEmpty(request.ReferenceNumber) ||
                    string.IsNullOrEmpty(request.PhoneNumber) ||
                    string.IsNullOrEmpty(request.Message) ||
                    string.IsNullOrEmpty(request.SecurityCodeMessageTag) ||
                    string.IsNullOrEmpty(request.ProductCode))
                {
                    throw new ArgumentNullException(nameof(request), "Required request params are missing!");
                }

                if (request.SecurityCodeDigitsCount < minCodeLength || request.SecurityCodeDigitsCount > maxCodeLength)
                {
                    throw new BusinessException("Security code must be from 4 to 12 digits long!");
                }

                _currentSecurityCode = PrepareSecurityCode(request);

                var integrationRequest = new SecuritySmsSendIntegrationRequest()
                {
                    Message = request.Message,
                    PhoneNumber = request.PhoneNumber,
                    SecurityCode = _currentSecurityCode,
                    ProductCode = request.ProductCode,
                    SourceType = request.SourceType
                };

                HttpResponseMessage response;

                try
                {
                    response = await _gateway.SendRequest(integrationRequest);

                    if (!response.IsSuccessStatusCode)
                    {
                        throw new HttpRequestException(response.ReasonPhrase, null, response.StatusCode);
                    }
                }
                catch (Exception e)
                {
                    _logger.Value.LogError("Integration request is unsuccessfull. : {0}", e.Message);

                    if (request.ThrowOnIntegrationError)
                    {
                        throw;
                    }

                    return string.Empty;
                }

                return await response.Content.ReadAsStringAsync();
            }

            void SaveNotificationInfo(SecuritySmsSendRequest request, string[] resultItems, DateTime sendDate)
            {
                var notification = new SecuritySmsNotificationData()
                {
                    SecurityCode = _currentSecurityCode,
                    SmsId = resultItems[2],
                    SmsTypeCode = (int) request.SmsTypeCode,
                    NotificationDate = sendDate,
                    NotificationId = Guid.NewGuid(),
                    PartyCode = request.PartyCode,
                    PhoneNumber = request.PhoneNumber,
                    ReferenceNumber = request.ReferenceNumber
                };

                _repository.StoreNotificationData(notification);
            }

            string PrepareSecurityCode(SecuritySmsSendRequest request)
            {
                if (!request.Message.Contains(request.SecurityCodeMessageTag, StringComparison.InvariantCultureIgnoreCase))
                {
                    throw new FormatException("Could not find security code tag inside message!");
                }

                var securityCode = GenerateDigitalSecurityCode(request);
                request.Message = Regex.Replace(request.Message, request.SecurityCodeMessageTag, securityCode);
                return securityCode;
            }

            string GenerateDigitalSecurityCode(SecuritySmsSendRequest request)
            {
                var securityNumberDigits = new int[request.SecurityCodeDigitsCount];

                for (int i = 0; i < request.SecurityCodeDigitsCount; i++)
                {
                    var digit = RandomNumberGenerator.GetInt32(0, 9);
                    securityNumberDigits[i] = digit;
                }

                return string.Join(string.Empty, securityNumberDigits);
            }
        }

        public SecurityCodeVerificationResponse VerifySecurityCode(SecurityCodeVerificationRequest request)
        {
            var lastNotification = _repository.GetLastNotificationData(request.ReferenceNumber, request.PartyCode, request.TypeCode);
            var currentTime = DateTime.Now;
            var minutesFromlastNotification = 0;

            if (lastNotification != null)
            {
                minutesFromlastNotification = (int) (currentTime - lastNotification.NotificationDate).TotalMinutes;
            }

            VerificationStateCode state;

            if (lastNotification == null)
            {
                state = VerificationStateCode.NotFound;
            }
            else if (lastNotification.SecurityCode != request.SecurityCode)
            {
                state = VerificationStateCode.Incorrect;
            }
            else if (minutesFromlastNotification > _settings.SecurityCodeExpirationInMinutes)
            {
                state = VerificationStateCode.Expired;
            }
            else
            {
                state = VerificationStateCode.Accepted;
                _repository.SetCodeAsVerified(lastNotification.NotificationId);
            }

            return new SecurityCodeVerificationResponse() { VerificationState = state };
        }
    }
}
