using System.Threading.Tasks;
using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Responses;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Services;
using Microsoft.AspNetCore.Mvc;
using RoutePrefix = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Adacta.AdInsure.Accounting.WebAPI
{
    [RoutePrefix("api/rgsl/accounting/shared/commission/act")]
    public class CommissionActServiceAppController : AIApiController
    {
        private readonly ICommissionActServiceApp _service;

        public CommissionActServiceAppController(ICommissionActServiceApp service) : base() => _service = service;

        [Route("create")]
        [HttpPost]
        public CommissionActCreateResponse Create(CommissionAct act) => _service.Create(act);

        [Route("update")]
        [HttpPost]
        public void Update(CommissionAct act) => _service.Update(act);

        [Route("create-or-update")]
        [HttpPost]
        public void CreateOrUpdate(CommissionAct act) => _service.CreateOrUpdate(act);

        [Route("set-status")]
        [HttpPost]
        public async Task SetStatus(CommissionActSetStatusRequest request) => await _service.SetStatus(request);

        [Route("set-status-group")]
        [HttpPost]
        public async Task SetStatusGroup(CommissionActSetStatusGroupRequest request) => await _service.SetStatusGroup(request);

        [Route("auto-populate")]
        [HttpPost]
        public async Task<AutoPopulateResponse> AutoPopulate(AutoPopulateRequest request) => await _service.AutoPopulate(request);

        [Route("populate-with-file")]
        [HttpPost]
        public Task<PopulateWithFileResponse> PopulateWithFile(PopulateWithFileRequest request) => _service.PopulateWithFile(request);

        [Route("clear")]
        [HttpPost]
        public void Clear(CommissionActClearRequest request) => _service.Clear(request);

        [Route("annul-item")]
        [HttpPost]
        public void AnnulItem(AnnulItemRequest request) => _service.AnnulItem(request);

        [Route("renew-item")]
        [HttpPost]
        public async Task RenewItem(RenewItemRequest request) => await _service.RenewItem(request);

        [Route("change-item-comm-rate")]
        [HttpPost]
        public void ChangeItemCommRate(ChangeItemCommRateRequest request) => _service.ChangeItemCommRate(request);

        [Route("update-act-header")]
        [HttpPost]
        public void UpdateActHeader(UpdateActHeaderRequest request) => _service.UpdateActHeader(request);

        [Route("migrate-act-history")]
        [HttpPost]
        public void MigrateActHistory(string actNo) => _service.MigrateActHistory(actNo);
    }
}
