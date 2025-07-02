using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.Requests;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.PAS.Domain.Contract.Repositories
{
    public interface IContractRepositoryRGSL
    {
        IEnumerable<ContractInfoRGSL> GetContractsInfoByNumber(ContractsInfoRequest request);

        ContractSysDataRGSL GetContractSysDataByNumber(ContractSysDataRequest request);

        void UpdateContractRisks(ContractRisksRequest request);
    }
}
