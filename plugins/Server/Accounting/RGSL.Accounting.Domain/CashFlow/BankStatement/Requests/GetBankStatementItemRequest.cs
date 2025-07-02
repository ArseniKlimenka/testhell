using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Requests
{
    public class GetBankStatementItemRequest
    {
        public IList<long> BankStatementItemIds { get; set; }
        public long? BankStatementItemId { get; set; }
        public Guid? RgslGuid { get; set; }
        public long? MinId { get; set; }
        public long? MaxId { get; set; }
    }
}
