namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories
{
    public interface IAccountNumberRepositoryRGSL
    {
        string GetAccountDefaultDataAccountNumber();
        string GetAccountDefaultIncomingDataAccountNumber();
        string GetAccountDefaultOutgoingEndowmentDataAccountNumber();
        string GetAccountDefaultRiskDeathDataAccountNumber();
    }
}
