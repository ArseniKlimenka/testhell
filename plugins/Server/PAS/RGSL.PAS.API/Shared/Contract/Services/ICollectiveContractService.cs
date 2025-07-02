using Adacta.AdInsure.Framework.Core.Domain.Common;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.DTO;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.Services
{
    public interface ICollectiveContractService
    {
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void ClearInsuredList(ClearInsuredListRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        long WriteInsured(WriteInsuredRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void ClearRiskList(ClearRiskListRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void WriteRisk(WriteRiskRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void SetInsuredCalculatedData(WriteInsuredRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void SetInsuredPartyCode(WriteInsuredRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void ClearRiskExpList(ClearRiskExpListRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void WriteRiskExp(WriteRiskExpRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void WriteTestLog(string comment);
    }
}
