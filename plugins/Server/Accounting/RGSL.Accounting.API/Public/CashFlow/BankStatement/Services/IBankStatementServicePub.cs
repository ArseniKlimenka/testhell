using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;

namespace Adacta.AdInsure.RGSL.Accounting.API.Public.CashFlow.BankStatement.Services
{
    public interface IBankStatementServicePub
    {
        CreateResponse Create(CreateBsiPubRequest request);
    }
}
