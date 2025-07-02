using Adacta.AdInsure.RGSL.PAS.Domain.Contract.DTO;

namespace Adacta.AdInsure.RGSL.PAS.Domain.Contract.Repositories
{
    public interface ICollectiveContractRepository
    {
        void ClearInsuredList(ClearInsuredListDomainRequest request);

        long WriteInsured(WriteInsuredDomainRequest request);

        void ClearRiskList(ClearRiskListDomainRequest request);

        void WriteRisk(WriteRiskDomainRequest request);

        void SetInsuredCalculatedData(WriteInsuredDomainRequest request);

        void SetInsuredPartyCode(WriteInsuredDomainRequest request);

        void ClearRiskExpList(ClearRiskExpListDomainRequest request);

        void WriteRiskExp(WriteRiskExpDomainRequest request);

        void WriteTestLog(string comment);
    }
}
