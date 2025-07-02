using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement.Services;
using Microsoft.AspNetCore.Mvc;
using RoutePrefix = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Adacta.AdInsure.RGSL.Accounting.WebAPI
{
    [RoutePrefix("api/rgsl/accounting/shared/cash-flow/rosfinmonitoring")]
    public class RosfinmonitoringXMLController : AIApiController, IRosfinmonitoringXMLService
    {
        private readonly IRosfinmonitoringXMLService _service;

        /// <summary>
        /// Constructor
        /// </summary>
        public RosfinmonitoringXMLController(IRosfinmonitoringXMLService service) : base() => _service = service;

        [Route("create-xml")]
        [HttpPost]
        public RosfinmonitoringXMLResponse CreateXml(RosfinmonitoringXMLRequest request) => _service.CreateXml(request);

        RosfinmonitoringXMLResponse IRosfinmonitoringXMLService.CreateXml(RosfinmonitoringXMLRequest request)
        {
            return _service.CreateXml(request);
        }
    }
}
