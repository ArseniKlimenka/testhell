using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.PaymentOrder
{
    public class NettedItemData
    {
        public string BankStatementNo { get; set; }
        public long BankStatementId { get; set; }
        public decimal AllocatedAmount { get; set; }
        public string DocumentNo { get; set; }
    }
}
