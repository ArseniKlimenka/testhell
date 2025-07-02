using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests
{
    public class AnnulItemRequest
    {
        public long? ActId { get; set; }
        public string ActNo { get; set; }
        public DateTime? LastUpdated { get; set; }
        public IList<AnnulItemRequestItem> Items { get; set; }
    }

    public class AnnulItemRequestItem
    {
        public string ContractNumber { get; set; }
        public DateTime DueDate { get; set; }
    }
}
