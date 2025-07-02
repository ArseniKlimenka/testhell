using System.Collections.Generic;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.CommissionAct.DTO;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.CommissionAct
{
    public interface ICommissionActAllocationStrategyRepository
    {
        IList<CommissionActDetailsDto> GetDocumentDetails(string referenceNo);
    }
}
