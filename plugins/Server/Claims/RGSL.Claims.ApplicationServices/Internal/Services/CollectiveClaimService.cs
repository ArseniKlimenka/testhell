using Adacta.AdInsure.RGSL.Claims.API.Internal.DTO;
using Adacta.AdInsure.RGSL.Claims.API.Internal.Requests;
using Adacta.AdInsure.RGSL.Claims.API.Internal.Services;
using Adacta.AdInsure.RGSL.Claims.ApplicationServices.Internal.Converters;
using RGSL.Claims.Domain.CollectiveClaim.Interfaces;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Claims.ApplicationServices.Internal.Services
{
    public class CollectiveClaimService : ICollectiveClaimService
    {
        private ICollectiveClaimDomainService _service;

        public CollectiveClaimService(ICollectiveClaimDomainService service)
        {
            _service = service;
        }

        public void SaveRecipientsToClaim(SaveRecipientsRequest request)
        {
            var convertedRecipients = CollectiveClaimConverter.Convert(request.Recipients);
            _service.SaveRecipientsToClaim(convertedRecipients);
        }

        public void SaveSingleRecipientToClaim(SaveSingleRecipientRequest request)
        {
            var convertedRecipient = CollectiveClaimConverter.Convert(request.Recipient);
            _service.SaveSingleRecipientToClaim(convertedRecipient);
        }
    }
}
