using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Responses
{
    public class PendingPaymentCheckAndPostResponse
    {
        public IList<long> PostedIds { get; set; }
        public string ErrorMessage { get; set; }
    }
}
