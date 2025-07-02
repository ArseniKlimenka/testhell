using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests
{
    public class CommissionActSetStatusGroupRequest
    {
        public List<string> ActNos { get; set; }
        public string NewStatus { get; set; }
    }
}
