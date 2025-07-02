using Adacta.AdInsure.Framework.Core.Domain.Common;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement.Services
{
    public interface IBankStatementServiceAppRGSL
    {
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        CreateResponse Create(CreateRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        RefreshResponse Refresh(RefreshRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        RefreshResponse RefreshIsRegistry(RefreshRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void Cancel(BankStatementItemSetStatusRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void Restore(BankStatementItemSetStatusRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void SetStatusAllocatedToRegistry(BankStatementItemSetStatusRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void UpdatePaymentDescription(UpdatePaymentDescriptionRequest request);

        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void MarkPaymentToReload(MarkPaymentToReloadRequest request);

        void SetRegistryMaskSettings(SetRegistryMaskSettingsRequest request);
    }
}
