namespace Adacta.AdInsure.RGSL.Common.API.Shared.Services
{
    public interface ITranslationServiceRGSL
    {
        string Translate(string translationKey);
        string Translate(string translationKey, params object[] args);
        string GetTranslation(string conceptType, string configurationName, string version, string key);
    }
}
