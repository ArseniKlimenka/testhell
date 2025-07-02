namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement.Services
{
    public interface IRosfinmonitoringXMLService
    {
        RosfinmonitoringXMLResponse CreateXml(RosfinmonitoringXMLRequest request);
    }
}
