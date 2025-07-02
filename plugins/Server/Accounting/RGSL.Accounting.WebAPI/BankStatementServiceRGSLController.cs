using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement.Services;
using Microsoft.AspNetCore.Mvc;
using RoutePrefix = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Adacta.AdInsure.RGSL.Accounting.WebAPI
{
    /// <summary>
    /// Controller that implements public <see cref="IBankStatementServiceAppRGSL"/>.
    /// </summary>
    [RoutePrefix("api/rgsl/accounting/shared/cash-flow/bank-statement")]
    public class BankStatementServiceRGSLController : AIApiController, IBankStatementServiceAppRGSL
    {
        private readonly IBankStatementServiceAppRGSL _service;

        /// <summary>
        /// Constructor
        /// </summary>
        public BankStatementServiceRGSLController(IBankStatementServiceAppRGSL service) : base() => _service = service;

        [Route("insert")]
        [HttpPost]
        public CreateResponse Create(CreateRequest request) => _service.Create(request);

        [Route("refresh")]
        [HttpPost]
        public RefreshResponse Refresh(RefreshRequest request) => _service.Refresh(request);

        [Route("refresh-is-registry")]
        [HttpPost]
        public RefreshResponse RefreshIsRegistry(RefreshRequest request) => _service.RefreshIsRegistry(request);

        [Route("cancel")]
        [HttpPost]
        public void Cancel(BankStatementItemSetStatusRequest request) => _service.Cancel(request);

        [Route("restore")]
        [HttpPost]
        public void Restore(BankStatementItemSetStatusRequest request) => _service.Restore(request);

        [Route("set-status-allocated-to-registry")]
        [HttpPost]
        public void SetStatusAllocatedToRegistry(BankStatementItemSetStatusRequest request) => _service.SetStatusAllocatedToRegistry(request);

        [Route("update-payment-description")]
        [HttpPost]
        public void UpdatePaymentDescription(UpdatePaymentDescriptionRequest request) => _service.UpdatePaymentDescription(request);

        [Route("mark-payment-to-reload")]
        [HttpPost]
        public void MarkPaymentToReload(MarkPaymentToReloadRequest request) => _service.MarkPaymentToReload(request);

        [Route("set-registry-mask-settings")]
        [HttpPut]
        public void SetRegistryMaskSettings(SetRegistryMaskSettingsRequest request) => _service.SetRegistryMaskSettings(request);
    }
}
