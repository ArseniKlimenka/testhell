using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Responses;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Interfaces
{
    public interface ICommissionActPopulationService
    {
        Task<int> AutoPopulate(long? actId, string actNo, IList<string> referenceNumbers, DateTime? lastUpdated, bool renew);
        Task<PopulateWithFileResponse> PopulateWithFile(long? actId, string actNo, string fileId, bool skipFailed, DateTime? lastUpdated);
        Task<int> RenewItem(long? actId, string actNo, DateTime? lastUpdated, IList<string> documentNumbers);
    }
}
