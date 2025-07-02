using RGSL.Claims.Domain.CollectiveClaim.DTO;
using System.Collections.Generic;

namespace RGSL.Claims.Domain.CollectiveClaim.Interfaces
{
    public interface ICollectiveClaimDomainService
    {
        void SaveRecipientsToClaim(IEnumerable<ColleciveClaimRecipientDomainDto> recipients);

        void SaveSingleRecipientToClaim(ColleciveClaimRecipientDomainDto recipient);
    }
}
