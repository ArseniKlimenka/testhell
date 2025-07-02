using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement
{
    public class UpdatePaymentDescriptionRequest
    {
        public IList<long> BankStatementItemIds { get; set; }
        public string NewPaymentDescription { get; set; }
    }
}
