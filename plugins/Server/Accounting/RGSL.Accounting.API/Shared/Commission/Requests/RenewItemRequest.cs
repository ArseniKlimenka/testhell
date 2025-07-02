using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests
{
    public class RenewItemRequest
    {
        public long? ActId { get; set; }
        public string ActNo { get; set; }
        public DateTime? LastUpdated { get; set; }
        public IList<string> DocumentNumbers { get; set; }
    }
}
