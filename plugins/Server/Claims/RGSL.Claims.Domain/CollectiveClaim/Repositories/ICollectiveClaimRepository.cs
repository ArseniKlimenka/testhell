using RGSL.Claims.Domain.CollectiveClaim.DTO;
using System.Collections.Generic;

namespace RGSL.Claims.Domain.CollectiveClaim.Repositories
{
    public interface ICollectiveClaimRepository
    {
        void SaveRecipientsToClaim(IEnumerable<ColleciveClaimRecipientDomainDto> recipients);

        void SaveSingleRecipientToClaim(ColleciveClaimRecipientDomainDto recipient);
    }
}
