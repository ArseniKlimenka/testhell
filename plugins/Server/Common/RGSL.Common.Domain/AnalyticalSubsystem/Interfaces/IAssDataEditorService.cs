using Adacta.AdInsure.RGSL.Common.API.Shared.Requests;

namespace Adacta.AdInsure.RGSL.Common.Domain.AnalyticalSubsystem.Interfaces
{
    public interface IAssDataEditorService
    {
        int DatabaseUpdate(AssDataEditorUpdateRequest request);
    }
}
