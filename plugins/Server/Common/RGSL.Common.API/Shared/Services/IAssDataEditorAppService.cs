using Adacta.AdInsure.Framework.Core.Domain.Common;
using Adacta.AdInsure.RGSL.Common.API.Shared.Requests;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Services
{
    public interface IAssDataEditorAppService
    {
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        int DatabaseUpdate(AssDataEditorUpdateRequest request);
    }
}
