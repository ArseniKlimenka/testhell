using Adacta.AdInsure.Framework.Core.API.Internal.Services;
using Adacta.AdInsure.RGSL.Common.API.Shared.Services;
using System.Globalization;

namespace Adacta.AdInsure.RGSL.Common.ApplicationServices.Shared.Services
{
    public class TranslationServiceRGSL : ITranslationServiceRGSL
    {
        private readonly ITranslationService _service;

        public TranslationServiceRGSL(ITranslationService service)
        {
            _service = service;
        }

        public string Translate(string translationKey)
        {
            return _service.GetMasterEntityItemTranslation("TranslationData", "localized-field", "description", translationKey);
        }

        public string Translate(string translationKey, params object[] args)
        {
            string text = Translate(translationKey);
            text = string.Format(CultureInfo.InvariantCulture, text, args);
            return text;
        }

        public string GetTranslation(string conceptType, string configurationName, string version, string key)
        {
            return _service.GetTranslation(conceptType, configurationName, version, key);
        }
    }
}
