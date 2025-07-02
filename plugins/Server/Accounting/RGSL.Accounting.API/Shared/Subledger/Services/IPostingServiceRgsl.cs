using Adacta.AdInsure.Framework.Core.Domain.Common;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Subledger.Requests;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Subledger.Services
{
    /// <summary>
    /// Posting service contract for posting different journals into accounting
    /// </summary>
    public interface IPostingServiceRgsl
    {
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void PostTransaction(PostTransactionRequest request);
    }
}
