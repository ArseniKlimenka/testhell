using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.Accounting.API.Public.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.API.Public.CashFlow.BankStatement.Services;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Microsoft.AspNetCore.Mvc;
using RoutePrefix = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Adacta.AdInsure.RGSL.Accounting.WebAPI.Public
{
    /// <summary>
    /// Controller that implements public <see cref="IBankStatementServicePub"/>.
    /// </summary>
    [RoutePrefix("api/rgsl/accounting/public/cash-flow/bank-statement")]
    public class BankStatementServicePubController : AIApiController, IBankStatementServicePub
    {
        private readonly IBankStatementServicePub _service;

        /// <summary>
        /// Constructor
        /// </summary>
        public BankStatementServicePubController(IBankStatementServicePub service) : base() => _service = service;

        [Route("create")]
        [HttpPost]
        public CreateResponse Create(CreateBsiPubRequest request) => _service.Create(request);
    }
}
