using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Responses;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Repositories
{
    public interface ICommissionActPopulationRepository
    {
        GetContractRisksResponse GetContractRisks(IList<string> contractNumbers);
    }
}
