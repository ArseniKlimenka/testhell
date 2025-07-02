using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Requests;
using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Repositories
{
    public interface IBankStatementRepositoryRGSL
    {
        IList<BankStatementItemRGSL> GetBankStatementItems(GetBankStatementItemRequest request);
        void CreateBankStatementItem(BankStatementItemRGSL bankStatementItem);
        void UpdateBankStatementItem(BankStatementItemRGSL bankStatementItem);
        void SetStatusAndOpenAmount(SetStatusRequest request);
        void SetStatus(SetStatusRequest request);

        void UpdatePaymentDescription(BankStatementItemRGSL bankStatementItem, string newPaymentDescription);
        void InsertBankStatementItemHistory(BankStatementItemHistory history);
        void MarkPaymentToReload(Guid rgslGuid);
        List<RegistryMaskSettingsItem> GetAllRegistryMasks();
        void SetRegistryMaskSettings(SetRegistryMaskSettingsRequest request);
        void SetIsRegistry(long bankStatementItemId, bool isRegistry);
        void InsertXMLMessageItemHistory(BankStatementXMLMessageItemHistory history);
    }
}
