using Adacta.AdInsure.Framework.Core.Domain.Common;
using Adacta.AdInsure.RGSL.PAS.API.Shared.InvestmentProfit.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.InvestmentProfit.Responses;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.InvestmentProfit.Services
{
    public interface IInvestmentProfitApplicationService
    {
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void UpsertInvestmentProfitRecord(UpsertImvestmentProfitRecordRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        AllocationResponse AllocateInvestmentProfit(AllocationRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        AllocationResponse AllocateClaimInvestmentProfit(AllocationRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void CancellAllDocumentAllocations(CancelAllocationRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void SetAllDocumentAllocationsToPaid(SetAllocationToPaidRequest request);
    }
}
