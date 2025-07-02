using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.AccountingCertificate;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.AccountingCertificate.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.AccountingCertificate.Services;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement.Services;
using Microsoft.AspNetCore.Mvc;
using RoutePrefix = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Adacta.AdInsure.RGSL.Accounting.WebAPI
{
	[RoutePrefix("api/rgsl/accounting/shared/accounting-certificate/fns")]
    public class FnsXMLController : AIApiController, IFnsXMLService
    {
        private readonly IFnsXMLService _service;

        /// <summary>
        /// Constructor
        /// </summary>
        public FnsXMLController(IFnsXMLService service) : base() => _service = service;

        [Route("create-xml")]
        [HttpPost]
        public FnsXMLResponse CreateXml(FnsXMLRequest request) => _service.CreateXml(request);
    }
}
