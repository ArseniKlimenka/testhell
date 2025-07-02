using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.Registry.DTO;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.Registry
{
    public interface IRegistryAllocationStrategyRepository
    {
        IList<RegistryDetailsDto> GetRegistryDetails(string referenceNo);
    }
}
