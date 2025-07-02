
using Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit.DTO;
using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit.Repositories
{
    public interface IInvestmentProfitRepository
    {
        void UpsertInvestmentProfitRecord(InvestmentProfitRecordDomainDTO record);
        void CancellAllDocumentAllocations(CancelAllocationRequestDomain request);
        void SetAllDocumentAllocationsToPaid(SetAllocationToPaidRequestDomain request);
        List<InvestmentProfitRecordDomainDTO> GetInvestProfitRecordsForAllocation(string contractNumber, DateTime eventDate, IEnumerable<int> paymentTypes);
        List<InvestmentProfitRecordDomainDTO> GetInvestProfitRecordsForClaimAllocation(string contractNumber, IEnumerable<int> paymentTypes);
        List<InvestmentProfitAllocationDomainDTO> GetRelatedAllocations(string referenceNumber, string configurationName);
        List<InvestmentProfitAllocationDomainDTO> GetRelatedAllocations(string referenceNumber, string configurationName, IEnumerable<Guid> additionalRecordids);
        void DeactivateAllocations(IEnumerable<Guid> allcoationsIds, DateTime processingStartTime);
        void ReactivateAllocations(IEnumerable<Guid> allcoationsIds, DateTime processingStartTime);
        void CreateAllocations(IEnumerable<InvestmentProfitAllocationDomainDTO> allocations);
    }
}
