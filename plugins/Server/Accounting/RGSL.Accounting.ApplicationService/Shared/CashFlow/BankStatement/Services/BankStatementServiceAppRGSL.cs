using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement.Services;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Interfaces;
using System;

namespace Adacta.AdInsure.RGSL.Accounting.ApplicationServices.Shared.CashFlow.BankStatement.Services
{
    public class BankStatementServiceAppRGSL : IBankStatementServiceAppRGSL
    {
        private readonly IBankStatementServiceRGSL _bankStatementServiceRGSL;

        public BankStatementServiceAppRGSL(
            IBankStatementServiceRGSL bankStatementServiceRGSL)
        {
            _bankStatementServiceRGSL = bankStatementServiceRGSL;
        }

        public CreateResponse Create(CreateRequest request)
        {
            return _bankStatementServiceRGSL.Create(request);
        }

        public RefreshResponse Refresh(RefreshRequest request)
        {
            _bankStatementServiceRGSL.RefreshStatusAndOpenAmount(request.BankStatementItemId);
            return new RefreshResponse();
        }

        public RefreshResponse RefreshIsRegistry(RefreshRequest request)
        {
            _bankStatementServiceRGSL.RefreshIsRegistry(request.BankStatementItemId);
            return new RefreshResponse();
        }

        public void Cancel(BankStatementItemSetStatusRequest request)
        {
            Guid businessEventId = Guid.NewGuid();
            foreach (var bsiId in request.BankStatementItemIds)
            {
                _bankStatementServiceRGSL.SetStatus(bsiId, BankStatementItemStatusRGSL.Cancelled, businessEventId);
            }
        }

        public void Restore(BankStatementItemSetStatusRequest request)
        {
            Guid businessEventId = Guid.NewGuid();
            foreach (var bsiId in request.BankStatementItemIds)
            {
                _bankStatementServiceRGSL.SetStatus(bsiId, BankStatementItemStatusRGSL.NotAllocated, businessEventId);
            }
        }

        public void SetStatusAllocatedToRegistry(BankStatementItemSetStatusRequest request)
        {
            Guid businessEventId = Guid.NewGuid();
            foreach (var bsiId in request.BankStatementItemIds)
            {
                _bankStatementServiceRGSL.SetStatus(bsiId, BankStatementItemStatusRGSL.AllocatedToRegistry, businessEventId);
            }
        }

        public void UpdatePaymentDescription(UpdatePaymentDescriptionRequest request)
        {
            _bankStatementServiceRGSL.UpdatePaymentDescription(request.BankStatementItemIds, request.NewPaymentDescription);
        }

        public void MarkPaymentToReload(MarkPaymentToReloadRequest request)
        {
            _bankStatementServiceRGSL.MarkPaymentToReload(request.RgslGuid);
        }

        public void SetRegistryMaskSettings(SetRegistryMaskSettingsRequest request)
        {
            _bankStatementServiceRGSL.SetRegistryMaskSettings(request);
        }
    }
}
