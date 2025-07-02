using System.Collections.Generic;
using System.Threading.Tasks;
using Adacta.AdInsure.Framework.Core.Domain.Common;
using Adacta.AdInsure.RGSL.Common.API.Shared.Requests;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Services
{
    public interface IMultiDataSourceRGSL
    {
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        Task<IEnumerable<MultiDataSourceAddDataSourcesResponse>> ExecuteWithAdditionaldDataSources(MultiDataSourceAddDataSourcesRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        IEnumerable<MultiDataSourceAddDataSourcesResponse> ExecuteWithAdditionaldDataSourcesSync(MultiDataSourceAddDataSourcesRequest request);
    }
}
