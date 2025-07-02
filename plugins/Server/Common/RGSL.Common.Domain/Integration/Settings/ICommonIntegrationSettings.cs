using Adacta.AdInsure.Framework.Core.ConfigurationSettings.Interfaces;
using System;

namespace Adacta.AdInsure.RGSL.Common.Domain.Integration.Settings
{
    public interface ICommonIntegrationSettings : IConfigConfigurationSettings
    {
        /// <summary>
        /// CBR URL for daily currency exchange rates
        /// </summary>
        Uri CurrencyExchangeRatesCbrUrl { get; }

        /// <summary>
        /// Use proxy for request currency exchange rates
        /// </summary>
        bool CurrencyExchangeRatesCbrUseProxy { get; }

        /// <summary>
        /// Proxy address with credential, format: http://proxyUser:proxyPassword@proxyAddress:proxyPort/
        /// </summary>
        string ProxyCredentialAddressPort { get; }

        /// <summary>
        /// CBR common Web Service URL for daily information
        /// </summary>
        Uri WebServiceDailyInfoCbrUrl { get; }

        /// <summary>
        /// SAP common Web Service URL for daily information
        /// </summary>
        Uri SAPCreatePartyUrl { get; }
        
        /// <summary>
        /// SAP common Web Service URL for daily information
        /// </summary>
        string SAPLogin { get; }

        /// <summary>
        /// SAP common Web Service URL for daily information
        /// </summary>
        string SAPPassword { get; }

        /// <summary>
        /// Enables BlackList Web Service
        /// </summary>
        bool EnableBlackListService { get; }

        /// <summary>
        /// BlackList common Web Service URL for daily information
        /// </summary>
        Uri BlackListUrl { get; }

        /// <summary>
        /// BlackList common Web Service URL for daily information
        /// </summary>
        string BlackListLogin { get; }

        /// <summary>
        /// BlackList common Web Service URL for daily information
        /// </summary>
        string BlackListPassword { get; }

        /// <summary>
        /// Digital signature Web Service URL for daily information
        /// </summary>
        Uri DigitalSignatureServiceUri { get; }

        /// <summary>
        /// Sms notification Web Service URL for daily information
        /// </summary>
        Uri SmsNotificationServiceUri { get; }

        /// <summary>
        /// Sms security code expiration time
        /// </summary>
        public int SecurityCodeExpirationInMinutes { get; }

        /// <summary>
        /// Sms security code request cooldown time
        /// </summary>
        public int SecurityCodeCooldownInMinutes { get; }

        /// <summary>
        /// Sms security service login
        /// </summary>
        public string SmsServiceLogin { get; }

        /// <summary>
        /// Sms security service password
        /// </summary>
        public string SmsServicePassword { get; }

        /// <summary>
        /// Scope for getting auth token
        /// </summary>
        public string AuthServiceScope { get; }

        /// <summary>
        /// Client Id for getting auth token
        /// </summary>
        public string AuthServiceClientId { get; }

        /// <summary>
        /// Client secret for getting auth token
        /// </summary>
        public string AuthServiceClientSecret { get; }

        /// <summary>
        /// Endpoint Url to IdentityServer used for Authorization
        /// </summary>
        public Uri OAuthIdentityUrl { get; }

        /// <summary>
        /// CheckContractors common Web Service URL for daily information
        /// </summary>
        Uri CheckContractorsUrl { get; }

        /// <summary>
        /// CheckContractors common Web Service URL for daily information
        /// </summary>
        string CheckContractorsLogin { get; }

        /// <summary>
        /// CheckContractors common Web Service URL for daily information
        /// </summary>
        string CheckContractorsPassword { get; }

        /// <summary>
        /// Format version for Rosfinmonitoring XML files
        /// </summary>
        string RosfinmonitoringFormatVersion { get; }

        /// <summary>
        /// Software version for Rosfinmonitoring XML files
        /// </summary>
        string RosfinmonitoringSoftwareVersion { get; }

        /// <summary>
        /// Correspondent ID for Rosfinmonitoring XML files
        /// </summary>
        string RosfinmonitoringCorrespondentId { get; }

        /// <summary>
        /// Output folder for Rosfinmonitoring XML files
        /// </summary>
        string RosfinmonitoringOutputFolder { get; }

        /// <summary>
        /// Enable logging for GetContractDataCustomService
        /// </summary>
        bool GetContractDataCustomServiceEnableLogging { get; }

        /// <summary>
        /// Enable logging for event sending
        /// </summary>
        bool SendEventEnableLogging { get; }

        /// <summary>
        /// Software version for FNS XML files
        /// </summary>
        string FnsOutputFolder { get; }

        /// <summary>
        /// Format version for FNS XML files
        /// </summary>
        string FnsFormatVersion { get; }

        /// <summary>
        /// Output folder for AccountingCertificateAttachment PDF files
        /// </summary>
        string AccountingCertificateAttachmentFolder { get; }
    }
}