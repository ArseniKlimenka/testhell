using Adacta.AdInsure.Framework.Core.AutoMapperConfiguration;
using Adacta.AdInsure.RGSL.Claims.API.Internal.DTO;
using RGSL.Claims.Domain.CollectiveClaim.DTO;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Claims.ApplicationServices.Internal.Converters
{
    public static class CollectiveClaimConverter
    {
        public static IEnumerable<ColleciveClaimRecipientDomainDto> Convert(IEnumerable<CollectiveClaimRecipientDto> recipients)
        {
            return AutoMapperAccessor.Mapper.Map<IEnumerable<ColleciveClaimRecipientDomainDto>>(recipients);
        }

        public static ColleciveClaimRecipientDomainDto Convert(CollectiveClaimRecipientDto recipient)
        {
            return AutoMapperAccessor.Mapper.Map<ColleciveClaimRecipientDomainDto>(recipient);
        }
    }
}
