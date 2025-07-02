using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services
{
    public class ReferenceNumberServiceRGSL : IReferenceNumberServiceRGSL
    {
        private readonly IReferenceNumberRepositoryRGSL _repository;

        public ReferenceNumberServiceRGSL(
            IReferenceNumberRepositoryRGSL repository
            )
        {
            _repository = repository;
        }

        public ReferenceNumber GetRef(string referenceNo)
        {
            return _repository.GetRef(referenceNo);
        }
    }
}
