using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Requests
{
    public class SetStatusRequest
    {
        public long BankStatementItemId { get; set; }
        public decimal OpenAmount { get; set; }
        public BankStatementItemStatusRGSL NewStatus { get; set; }
    }
}
