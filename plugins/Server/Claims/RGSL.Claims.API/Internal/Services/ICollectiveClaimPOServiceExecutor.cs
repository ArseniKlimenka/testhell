using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Domain.Common;
using Adacta.AdInsure.RGSL.Claims.API.Internal.Requests;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Claims.API.Internal.Services
{
    public interface ICollectiveClaimPOServiceExecutor
    {
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        Task<JsonObject> ExecutePoCreation(CreateCollectibeClaimPoRequest request);
    }
}
