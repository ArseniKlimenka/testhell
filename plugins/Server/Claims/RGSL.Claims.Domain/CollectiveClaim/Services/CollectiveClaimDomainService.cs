using Adacta.AdInsure.Framework.Core.Domain.Notifications.Models;
using RGSL.Claims.Domain.CollectiveClaim.DTO;
using RGSL.Claims.Domain.CollectiveClaim.Interfaces;
using RGSL.Claims.Domain.CollectiveClaim.Repositories;
using System.Collections.Generic;

namespace RGSL.Claims.Domain.CollectiveClaim.Services
{
    public class CollectiveClaimDomainService : ICollectiveClaimDomainService
    {
        private ICollectiveClaimRepository _repository;

        public CollectiveClaimDomainService(ICollectiveClaimRepository repository)
        {
                _repository = repository;
        }

        public void SaveRecipientsToClaim(IEnumerable<ColleciveClaimRecipientDomainDto> recipients)
        {
            _repository.SaveRecipientsToClaim(recipients);
        }

        public void SaveSingleRecipientToClaim(ColleciveClaimRecipientDomainDto recipient)
        {
            _repository.SaveSingleRecipientToClaim(recipient);
        }
    }
}