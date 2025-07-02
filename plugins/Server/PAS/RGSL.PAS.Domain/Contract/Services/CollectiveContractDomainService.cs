using Adacta.AdInsure.RGSL.PAS.Domain.Contract.DTO;
using Adacta.AdInsure.RGSL.PAS.Domain.Contract.Interfaces;
using Adacta.AdInsure.RGSL.PAS.Domain.Contract.Repositories;

namespace Adacta.AdInsure.RGSL.PAS.Domain.Contract.Services
{
    public class CollectiveContractDomainService : ICollectiveContractDomainService
    {
        private readonly ICollectiveContractRepository _repository;

        public CollectiveContractDomainService(ICollectiveContractRepository repository)
        {
            _repository = repository;
        }

        public void ClearInsuredList(ClearInsuredListDomainRequest request)
        {
            _repository.ClearInsuredList(request);
        }

        public long WriteInsured(WriteInsuredDomainRequest request)
        {
            var id = _repository.WriteInsured(request);

            return id;
        }

        public void ClearRiskList(ClearRiskListDomainRequest request)
        {
            _repository.ClearRiskList(request);
        }

        public void WriteRisk(WriteRiskDomainRequest request)
        {
            _repository.WriteRisk(request);
        }

        public void SetInsuredCalculatedData(WriteInsuredDomainRequest request)
        {
            _repository.SetInsuredCalculatedData(request);
        }

        public void SetInsuredPartyCode(WriteInsuredDomainRequest request)
        {
            _repository.SetInsuredPartyCode(request);
        }

        public void ClearRiskExpList(ClearRiskExpListDomainRequest request)
        {
            _repository.ClearRiskExpList(request);
        }

        public void WriteRiskExp(WriteRiskExpDomainRequest request)
        {
            _repository.WriteRiskExp(request);
        }

        public void WriteTestLog(string comment)
        {
            _repository.WriteTestLog(comment);
        }
    }
}
