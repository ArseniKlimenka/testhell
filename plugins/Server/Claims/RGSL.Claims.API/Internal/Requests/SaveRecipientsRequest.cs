using Adacta.AdInsure.RGSL.Claims.API.Internal.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Claims.API.Internal.Requests
{
    public class SaveRecipientsRequest
    {
        public IEnumerable<CollectiveClaimRecipientDto> Recipients { get; set; }
    }
}
