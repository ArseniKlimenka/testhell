using Adacta.AdInsure.Framework.Core.Domain.Common;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.DTO;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.Services
{
    public interface IContractServiceRGSL
    {
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        IEnumerable<ContractInfoRGSL> GetContractsInfoByNumber(ContractsInfoRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        ContractSysDataRGSL GetContractSysDataByNumber(ContractSysDataRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        Task<ManualContractUpdateResponse> UpdateContractManually(ManualContractUpdateRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        Task<DocumentEvaluationResult> EvaluateContract(ContractSysDataRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void UpdateContractRisks(ContractRisksRequest request);
    }
}
