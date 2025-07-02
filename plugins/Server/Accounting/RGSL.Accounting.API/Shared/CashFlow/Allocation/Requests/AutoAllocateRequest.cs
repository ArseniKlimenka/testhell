using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Requests
{
    public class AutoAllocateRequest
    {
        /// <summary>
        /// BankStatementItemId which will be allocated
        /// </summary>
        public List<long> BankStatementItemIds { get; set; }
    }
}