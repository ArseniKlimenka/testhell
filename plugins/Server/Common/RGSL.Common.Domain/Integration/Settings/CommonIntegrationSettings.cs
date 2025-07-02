using Adacta.AdInsure.Framework.Core.ConfigurationSettings.Interfaces;
using Adacta.AdInsure.Framework.Core.Localization;
using System;

namespace Adacta.AdInsure.RGSL.Common.Domain.Integration.Settings
{
    public class CommonIntegrationSettings : ICommonIntegrationSettings
    {
        private readonly IConfigConfigurationSettingsProvider _provider;

        private const string OAuthIdentityUrlPath = "AdInsure:Settings:OAuthIdentity:IdentityEndpointUrl";

        private const string CurrencyExchangeRatesCbrUrlPath = "AdInsure:Settings:RGSL:Integration:Cbr:CurrencyExchangeRatesUrl";
        private const string CurrencyExchangeRatesCbrUseProxyPath = "AdInsure:Settings:RGSL:Integration:Cbr:UseProxy";
        private const string WebServiceDailyInfoCbrUrlPath = "AdInsure:Settings:RGSL:Integration:Cbr:WebServiceDailyInfoCbrUrl";

        private const string ProxyCredentialAddressPortPath = "AdInsure:RGSL:Settings:Integration:ProxyCredentialAddressPort";

        private const string SAPCreatePartyUrlPath = "AdInsure:Settings:RGSL:Integration:SAP:CreatePartyUrl";
        private const string SAPIntegrationLogin = "AdInsure:Settings:RGSL:Integration:SAP:Login";
        private const string SAPIntegrationPassword = "AdInsure:Settings:RGSL:Integration:SAP:Password";

        private const string EnableBlackListServiceSetting = "AdInsure:Settings:RGSL:Integration:BlackList:EnableBlackListService";
        private const string BlackListUrlPath = "AdInsure:Settings:RGSL:Integration:BlackList:Url";
        private const string BlackListIntegrationLogin = "AdInsure:Settings:RGSL:Integration:BlackList:Login";
        private const string BlackListIntegrationPassword = "AdInsure:Settings:RGSL:Integration:BlackList:Password";

        private const string CheckContractorsUrlPath = "AdInsure:Settings:RGSL:Integration:KPK:Uri";
        private const string CheckContractorsIntegrationLogin = "AdInsure:Settings:RGSL:Integration:KPK:UserName";
        private const string CheckContractorsIntegrationPassword = "AdInsure:Settings:RGSL:Integration:KPK:Password";

        private const string DigitalSignatureServiceUriPath = "AdInsure:Settings:RGSL:Integration:DigitalSignature:Uri";

        private const string SmsNotificationServiceUriPath = "AdInsure:Settings:RGSL:Integration:SecuritySmsNotification:Uri";
        private const string SecurityCodeExpirationInMinutesValue = "AdInsure:Settings:RGSL:Integration:SecuritySmsNotification:SecurityCodeExpirationInMinutes";
        private const string SecurityCodeCooldownInMinutesValue = "AdInsure:Settings:RGSL:Integration:SecuritySmsNotification:SecurityCodeCooldownInMinutes";
        private const string SmsServiceLoginValue = "AdInsure:Settings:RGSL:Integration:SecuritySmsNotification:SmsServiceLogin";
        private const string SmsServicePasswordValue = "AdInsure:Settings:RGSL:Integration:SecuritySmsNotification:SmsServicePassword";

        private const string AuthServiceScopePath = "AdInsure:Settings:RGSL:Integration:AuthService:Scope";
        private const string AuthServiceClientIdPath = "AdInsure:Settings:RGSL:Integration:AuthService:ClientId";
        private const string AuthServiceClientSecretPath = "AdInsure:Settings:RGSL:Integration:AuthService:ClientSecret";

        private const string RosfinmonitoringServiceFormatVersion = "AdInsure:Settings:RGSL:Integration:Rosfinmonitoring:FormatVersion";
        private const string RosfinmonitoringServiceSoftwareVersion = "AdInsure:Settings:RGSL:Integration:Rosfinmonitoring:SoftwareVersion";
        private const string RosfinmonitoringServiceCorrespondentId = "AdInsure:Settings:RGSL:Integration:Rosfinmonitoring:CorrespondentId";
        private const string RosfinmonitoringServiceOutputFolder = "AdInsure:Settings:RGSL:Integration:Rosfinmonitoring:OutputFolder";

        private const string AccountingCertificateServiceAttachmentFolder = "AdInsure:Settings:RGSL:Integration:NalogPDF:OutputFolder";

        private const string GetContractDataCustomServiceEnableLoggingPath = "AdInsure:Settings:RGSL:Integration:GetContractDataCustomService:EnableLogging";
        private const string SendEventEnableLoggingPath = "AdInsure:Settings:RGSL:Integration:SendEvent:EnableLogging";

        private const string FnsServiceOutputFolder = "AdInsure:Settings:RGSL:Integration:Fns:OutputFolder";
        private const string FnsServiceFormatVersion = "AdInsure:Settings:RGSL:Integration:Fns:FormatVersion";

        public CommonIntegrationSettings(IConfigConfigurationSettingsProvider provider)
        {
            _provider = provider;
        }

        public string Module => LocalizationServiceRegistrator.CORE;

        public Uri CurrencyExchangeRatesCbrUrl => _provider.GetAppSetting<Uri>(CurrencyExchangeRatesCbrUrlPath);
        public Uri WebServiceDailyInfoCbrUrl => _provider.GetAppSetting<Uri>(WebServiceDailyInfoCbrUrlPath);
        public bool CurrencyExchangeRatesCbrUseProxy => _provider.GetAppSetting<bool>(CurrencyExchangeRatesCbrUseProxyPath, false);

        public string ProxyCredentialAddressPort => _provider.GetAppSetting<string>(ProxyCredentialAddressPortPath, null);

        public Uri OAuthIdentityUrl => _provider.GetAppSetting<Uri>(OAuthIdentityUrlPath, null);

        public Uri SAPCreatePartyUrl => _provider.GetAppSetting<Uri>(SAPCreatePartyUrlPath, null);
        public string SAPLogin => _provider.GetAppSetting<string>(SAPIntegrationLogin, null);
        public string SAPPassword => _provider.GetAppSetting<string>(SAPIntegrationPassword, null);

        public bool EnableBlackListService => _provider.GetAppSetting<bool>(EnableBlackListServiceSetting, false);
        public Uri BlackListUrl => _provider.GetAppSetting<Uri>(BlackListUrlPath, null);
        public string BlackListLogin => _provider.GetAppSetting<string>(BlackListIntegrationLogin, null);
        public string BlackListPassword => _provider.GetAppSetting<string>(BlackListIntegrationPassword, null);
        public Uri CheckContractorsUrl => _provider.GetAppSetting<Uri>(CheckContractorsUrlPath, null);
        public string CheckContractorsLogin => _provider.GetAppSetting<string>(CheckContractorsIntegrationLogin, null);
        public string CheckContractorsPassword => _provider.GetAppSetting<string>(CheckContractorsIntegrationPassword, null);

        public Uri DigitalSignatureServiceUri => _provider.GetAppSetting<Uri>(DigitalSignatureServiceUriPath, null);

        public Uri SmsNotificationServiceUri => _provider.GetAppSetting<Uri>(SmsNotificationServiceUriPath, null);
        public int SecurityCodeCooldownInMinutes => _provider.GetAppSetting<int>(SecurityCodeCooldownInMinutesValue, 5);
        public int SecurityCodeExpirationInMinutes => _provider.GetAppSetting<int>(SecurityCodeExpirationInMinutesValue, 30);
        public string SmsServiceLogin => _provider.GetAppSetting<string>(SmsServiceLoginValue, string.Empty);
        public string SmsServicePassword => _provider.GetAppSetting<string>(SmsServicePasswordValue, string.Empty);

        public string AuthServiceScope => _provider.GetAppSetting<string>(AuthServiceScopePath, null);
        public string AuthServiceClientId => _provider.GetAppSetting<string>(AuthServiceClientIdPath, null);
        public string AuthServiceClientSecret => _provider.GetAppSetting<string>(AuthServiceClientSecretPath, null);

        public string RosfinmonitoringFormatVersion => _provider.GetAppSetting<string>(RosfinmonitoringServiceFormatVersion, null);
        public string RosfinmonitoringSoftwareVersion => _provider.GetAppSetting<string>(RosfinmonitoringServiceSoftwareVersion, null);
        public string RosfinmonitoringCorrespondentId => _provider.GetAppSetting<string>(RosfinmonitoringServiceCorrespondentId, null);
        public string RosfinmonitoringOutputFolder => _provider.GetAppSetting<string>(RosfinmonitoringServiceOutputFolder, null);

        public string AccountingCertificateAttachmentFolder => _provider.GetAppSetting<string>(AccountingCertificateServiceAttachmentFolder, null);

        public bool GetContractDataCustomServiceEnableLogging => _provider.GetAppSetting<bool>(GetContractDataCustomServiceEnableLoggingPath, false);
        public bool SendEventEnableLogging => _provider.GetAppSetting<bool>(SendEventEnableLoggingPath, false);

        public string FnsOutputFolder => _provider.GetAppSetting<string>(FnsServiceOutputFolder, null);
        public string FnsFormatVersion => _provider.GetAppSetting<string>(FnsServiceFormatVersion, null);
    }
}
