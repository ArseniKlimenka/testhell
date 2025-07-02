using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement
{
    public class CreateRequest
    {
        public List<BankStatementItemAppRGSL> Items { get; set; }
    }
}
