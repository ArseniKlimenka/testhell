using Adacta.AdInsure.RGSL.Common.API.Shared.Requests;
using Adacta.AdInsure.RGSL.Common.API.Shared.Services;
using Adacta.AdInsure.RGSL.Common.Domain.AnalyticalSubsystem.Interfaces;

namespace Adacta.AdInsure.RGSL.Common.ApplicationServices.Shared.Services
{
    public class AssDataEditorAppService : IAssDataEditorAppService
    {
        private readonly IAssDataEditorService _assDataEditorService;

        public AssDataEditorAppService(IAssDataEditorService assDataEditorService)
        {
            _assDataEditorService = assDataEditorService;
        }

        public int DatabaseUpdate(AssDataEditorUpdateRequest request)
        {
            return _assDataEditorService.DatabaseUpdate(request);
        }
    }
}
