using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement.Services;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration.Interfaces;
using Adacta.AdInsure.RGSL.Common.API.Shared.Integration.DTOs;

namespace Adacta.AdInsure.RGSL.Accounting.ApplicationServices.Shared.CashFlow.BankStatement.Services
{
    public class RosfinmonitoringXMLService : IRosfinmonitoringXMLService
    {
        private readonly IRosfinmonitoringXMLDomainService _domainService;

        public RosfinmonitoringXMLService(IRosfinmonitoringXMLDomainService domainService)
        {
            _domainService = domainService;
        }

        public RosfinmonitoringXMLResponse CreateXml(RosfinmonitoringXMLRequest request)
        {
            var xmlResponse = new RosfinmonitoringXMLResponse();

            xmlResponse = _domainService.CreateXml(request);

            return xmlResponse;
        }
    }
}
