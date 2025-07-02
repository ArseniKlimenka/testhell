using System;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests
{
    public class CommissionActSetStatusRequest
    {
        public long? ActId { get; set; }
        public string ActNo { get; set; }
        public DateTime? LastUpdated { get; set; }
        public string NewState { get; set; }
    }
}
