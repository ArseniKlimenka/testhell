using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration.Interfaces
{
    public interface IRosfinmonitoringXMLDomainService
    {
        RosfinmonitoringXMLResponse CreateXml(RosfinmonitoringXMLRequest request);
    }
}
