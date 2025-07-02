using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Services;
using Adacta.AdInsure.PAS.Domain.Contracts.Repositories;
using Adacta.AdInsure.RGSL.PAS.API.Shared.NumberGenerator.Services;

namespace Adacta.AdInsure.RGSL.PAS.ApplicationServices.Shared.NumberGenerator.Services
{
    public class NumberGeneratorApplicationService : INumberGeneratorApplicationService
    {
        private readonly IContractRepository _contractRepository;
        private readonly IDocumentBusinessNumberGenerator _documentBusinessNumberGenerator;

        public NumberGeneratorApplicationService(
            IContractRepository contractRepository,
            IDocumentBusinessNumberGenerator documentBusinessNumberGenerator)
        {
            _contractRepository = contractRepository;
            _documentBusinessNumberGenerator = documentBusinessNumberGenerator;
        }

        public string GenerateDocumentNumber(string contractNumber)
        {
            var document = _contractRepository.GetByNumber(contractNumber);
            var number = _documentBusinessNumberGenerator.Generate(document, string.Empty);

            return number;
        }
    }
}
