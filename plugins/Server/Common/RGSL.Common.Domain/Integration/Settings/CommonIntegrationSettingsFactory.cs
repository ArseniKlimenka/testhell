using Adacta.AdInsure.Framework.Core.ConfigurationSettings.Interfaces;

namespace Adacta.AdInsure.RGSL.Common.Domain.Integration.Settings
{
	public class CommonIntegrationSettingsFactory : IConfigurationSettingFactory<CommonIntegrationSettings, IConfigConfigurationSettingsProvider>
	{
        /// <summary>
        /// Create Common integration settings class with specified provider
        /// </summary>
        /// <param name="provider">Config configuration settings provider</param>
        /// <returns>Common integration settings</returns>
        public CommonIntegrationSettings Create(IConfigConfigurationSettingsProvider provider)
        {
            return new CommonIntegrationSettings(provider);
        }
    }
}
