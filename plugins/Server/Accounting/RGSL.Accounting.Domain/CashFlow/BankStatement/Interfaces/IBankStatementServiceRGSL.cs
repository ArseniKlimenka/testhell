using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Interfaces
{
    public interface IBankStatementServiceRGSL
    {
        CreateResponse Create(CreateRequest request);
        RefreshResponse RefreshStatusAndOpenAmount(long bankStatementItemId);
        void RefreshIsRegistry(long bankStatementItemId);
        void SetStatus(long bankStatementItemId, BankStatementItemStatusRGSL newStatusId, Guid businessEventId);
        void UpdatePaymentDescription(IList<long> bankStatementItemIds, string newPaymentDescription);
        void MarkPaymentToReload(Guid rgslGuid);
        void SetRegistryMaskSettings(SetRegistryMaskSettingsRequest request);
    }
}
