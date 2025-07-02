using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.Requests;
using Adacta.AdInsure.RGSL.PAS.Domain.Contract.Interfaces;
using Adacta.AdInsure.RGSL.PAS.Domain.Contract.Repositories;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.PAS.Domain.Contract.Services
{
    public class ContractDomainServiceRGSL : IContractDomainServiceRGSL
    {
        private readonly IContractRepositoryRGSL _repository;

        public ContractDomainServiceRGSL(IContractRepositoryRGSL repository)
        {
            _repository = repository;
        }

        public IEnumerable<ContractInfoRGSL> GetContractsInfoByNumber(ContractsInfoRequest request)
        {
            return _repository.GetContractsInfoByNumber(request);
        }

        public ContractSysDataRGSL GetContractSysDataByNumber(ContractSysDataRequest request)
        {
            return _repository.GetContractSysDataByNumber(request);
        }

        public void UpdateContractRisks(ContractRisksRequest request)
        {
            _repository.UpdateContractRisks(request);
        }
    }
}
