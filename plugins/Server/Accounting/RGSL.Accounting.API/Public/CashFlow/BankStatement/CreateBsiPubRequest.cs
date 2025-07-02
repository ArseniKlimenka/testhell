using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.API.Public.CashFlow.BankStatement
{
    public class CreateBsiPubRequest
    {
        public List<BankStatementItemPub> Items { get; set; }
    }
}
