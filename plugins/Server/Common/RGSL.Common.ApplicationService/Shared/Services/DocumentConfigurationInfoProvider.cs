using Adacta.AdInsure.Framework.Core.Domain.Entities.Common.Enums;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Providers;
using Adacta.AdInsure.RGSL.Common.API.Shared.Requests;
using Adacta.AdInsure.RGSL.Common.API.Shared.Responses;
using Adacta.AdInsure.RGSL.Common.API.Shared.Services;
using System.Collections.Generic;
using System.Linq;

namespace Adacta.AdInsure.RGSL.Common.ApplicationServices.Shared.Services
{
    public class DocumentConfigurationInfoProvider : IDocumentConfigurationInfoProvider
    {
        private IDocumentConfigurationProvider _configurationProvider;

        public DocumentConfigurationInfoProvider(IDocumentConfigurationProvider configurationProvider)
        {
            _configurationProvider = configurationProvider;
        }

        public IEnumerable<DocumentAttachmentInfoDto> GetPrintoutsInfo(DocumentAttachmentInfoRequest request)
        {
            var conf = _configurationProvider.GetByVersion(request.ConfigurationName, "1", true);
            var result = conf.AttachmentConfigurations.Where(a => a.Value.Flow == AttachmentFlowEnum.Outgoing)
                .Select(a => new DocumentAttachmentInfoDto { AttachmentType = a.Value.AttachmentType, PrintoutName = a.Value.TargetPrintout});

            return result;
        }
    }
}