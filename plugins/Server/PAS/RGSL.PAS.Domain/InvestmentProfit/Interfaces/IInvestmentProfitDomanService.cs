using Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit.DTO;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit.Interfaces
{
    public interface IInvestmentProfitDomanService
    {
        void UpsertInvestmentProfitRecord(InvestmentProfitRecordDomainDTO record);
        IEnumerable<AllocatedRecordDomainDTO> AllocateInvestmentProfit(AllocationRequestDomain request);
        IEnumerable<AllocatedRecordDomainDTO> AllocateClaimInvestmentProfit(AllocationRequestDomain request);
        void CancellAllDocumentAllocations(CancelAllocationRequestDomain request);
        void SetAllDocumentAllocationsToPaid(SetAllocationToPaidRequestDomain request);
    }
}
