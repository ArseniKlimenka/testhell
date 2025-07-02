using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces
{
    public interface IAllocationToleranceServiceRGSL
    {
        ApplyToleranceResult ApplyTolerance(AllocationToleranceType toleranceType, string docCurrencyCode, decimal installmentAmount, decimal installmentOpenAmount, decimal requestedAllocationAmount);
    }
}
