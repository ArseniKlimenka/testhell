namespace Adacta.AdInsure.RGSL.PAS.API.Shared.NumberGenerator.Services
{
    public interface INumberGeneratorApplicationService
    {
        public string GenerateDocumentNumber(string contractNumber);
    }
}
