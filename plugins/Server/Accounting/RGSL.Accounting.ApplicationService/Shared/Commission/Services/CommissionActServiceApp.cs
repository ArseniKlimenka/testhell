using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Responses;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Services;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Interfaces;

namespace Adacta.AdInsure.RGSL.Accounting.ApplicationServices.Shared.Commission.Services
{
    public class CommissionActServiceApp : ICommissionActServiceApp
    {
        private readonly ICommissionActService _commissionActService;
        private readonly ICommissionActRepository _commissionActRepository;
        private readonly ICommissionActPopulationService _commissionActPopulationService;
        private readonly IInvoicedCommissionService _invoicedCommissionService;

        public CommissionActServiceApp(
            ICommissionActService commissionActService,
            ICommissionActRepository commissionActRepository,
            ICommissionActPopulationService commissionActPopulationService,
            IInvoicedCommissionService invoicedCommissionService)
        {
            _commissionActService = commissionActService;
            _commissionActRepository = commissionActRepository;
            _commissionActPopulationService = commissionActPopulationService;
            _invoicedCommissionService = invoicedCommissionService;
        }

        public CommissionActCreateResponse Create(CommissionAct act)
        {
            long actId = _commissionActService.Create(act, false);
            return new CommissionActCreateResponse
            {
                ActId = actId,
            };
        }

        public void CreateOrUpdate(CommissionAct act)
        {
            _commissionActService.CreateOrUpdate(act);
        }

        public void Update(CommissionAct act)
        {
            _commissionActService.Update(act);
        }

        public async Task SetStatus(CommissionActSetStatusRequest request)
        {
            await _commissionActService.SetStatus(request.ActId, request.ActNo, request.LastUpdated, request.NewState);
        }

        public async Task SetStatusGroup(CommissionActSetStatusGroupRequest request)
        {
            foreach (var actNo in request.ActNos)
            {
                await _commissionActService.SetStatus(null, actNo, null, request.NewStatus);
            }
        }

        public Task<AutoPopulateResponse> AutoPopulate(AutoPopulateRequest request)
        {
            throw new NotSupportedException("Use 'ActAutoPopulate' integration service");
        }

        public async Task<PopulateWithFileResponse> PopulateWithFile(PopulateWithFileRequest request)
        {
            return await _commissionActPopulationService.PopulateWithFile(request.ActId, request.ActNo, request.FileId, request.SkipFailed, request.LastUpdated);
        }

        public void Clear(CommissionActClearRequest request)
        {
            _commissionActService.Clear(request.ActId, request.ActNo, request.LastUpdated);
        }

        public void AnnulItem(AnnulItemRequest request)
        {
            _ = request.Items ?? throw new InvalidOperationException("Items must be defined");
            _commissionActService.AnnulItem(request.ActId, request.ActNo, request.LastUpdated, request.Items);
        }

        public async Task RenewItem(RenewItemRequest request)
        {
            _ = request.DocumentNumbers ?? throw new InvalidOperationException("DocumentNumbers must be defined");
            await _commissionActPopulationService.RenewItem(request.ActId, request.ActNo, request.LastUpdated, request.DocumentNumbers);
        }

        public void ChangeItemCommRate(ChangeItemCommRateRequest request)
        {
            _commissionActService.ChangeItemCommRate(request.ActItemIds, request.LastUpdated, request.CommRateManual, request.LcCommAmountManual);
        }

        public void UpdateActHeader(UpdateActHeaderRequest request)
        {
            _commissionActService.UpdateActHeader(request.ActId);
        }

        public void MigrateActHistory(string actNo)
        {
            _commissionActService.MigrateActHistory(actNo);
        }

        public void UpdateItemJson(ActUpdateItemJsonRequest request)
        {
            foreach (var item in request.Items)
            {
                _commissionActService.UpdateActItemJson(item.ItemId, item.JsonData);
            }
        }

        public InvoicedCommissionResponse GetInvoicedCommission(List<InvoicedCommissionRequest> invoicedCommissionRequest)
        {
            return _invoicedCommissionService.GetInvoicedCommission(invoicedCommissionRequest);
        }

        public InstallmentAmountsResponse GetInstallmentAmounts(IList<InstallmentAmountsRequest> installmentAmountsRequest)
        {
            return _commissionActRepository.GetInstallmentAmounts(installmentAmountsRequest);
        }

        public void UpdateItemStatus(long actId, CommissionActItemStatusId newStatus, IList<long> itemIds)
        {
            _commissionActRepository.UpdateItemStatus(actId, newStatus, itemIds);
        }

        public void InsertActItem(List<CommissionActItem> actItems)
        {
            _commissionActRepository.InsertActItem(actItems);
        }

        public void InsertActItemPc(List<CommissionActItemPc> actItemPcs)
        {
            _commissionActRepository.InsertActItemPc(actItemPcs);
        }
    }
}
