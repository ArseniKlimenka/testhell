using Adacta.AdInsure.Framework.Core.ConfigurationSettings.Interfaces;
using Adacta.AdInsure.RGSL.Party.API.Services;
using System;

namespace Adacta.AdInsure.RGSL.Party.ApplicationServices.Services
{
    class DadataSettings : IDadataSettings
    {
        private const string PathPrefix = "AdInsure:Settings:RGSL:Integration:Dadata";

        private readonly IConfigConfigurationSettingsProvider _provider;

        public DadataSettings(IConfigConfigurationSettingsProvider provider)
        {
            _provider = provider;
        }

        public bool EnableDadataService => _provider.GetAppSetting($"{PathPrefix}:EnableDadataService", false);

        public Uri Uri => new(_provider.GetAppSetting<string>($"{PathPrefix}:Uri"));

        public string Token => _provider.GetAppSetting<string>($"{PathPrefix}:Token");
    }
}