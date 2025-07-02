using Adacta.AdInsure.Framework.Core.Domain.Common;
using Adacta.AdInsure.RGSL.Claims.API.Internal.DTO;
using Adacta.AdInsure.RGSL.Claims.API.Internal.Requests;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Claims.API.Internal.Services
{
    public interface ICollectiveClaimService
    {
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void SaveRecipientsToClaim(SaveRecipientsRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void SaveSingleRecipientToClaim(SaveSingleRecipientRequest request);
    }
}