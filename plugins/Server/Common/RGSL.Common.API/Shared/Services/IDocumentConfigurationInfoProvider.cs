using Adacta.AdInsure.RGSL.Common.API.Shared.Requests;
using Adacta.AdInsure.RGSL.Common.API.Shared.Responses;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Services
{
    public interface IDocumentConfigurationInfoProvider
    {
        IEnumerable<DocumentAttachmentInfoDto> GetPrintoutsInfo(DocumentAttachmentInfoRequest request);
    }
}
