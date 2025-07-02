using Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit.DTO;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit
{
    public class AllocationResultDomain
    {
        public IEnumerable<InvestmentProfitRecordDomainDTO> AllocatedRecords { get; set; }
        public IEnumerable<InvestmentProfitAllocationDomainDTO> CreatedAllocations { get; set; }
        public IEnumerable<InvestmentProfitAllocationDomainDTO> DeactivatedAllocations { get; set; }
        public IEnumerable<InvestmentProfitAllocationDomainDTO> ReactivatedAllocations { get; set; }
    }
}
