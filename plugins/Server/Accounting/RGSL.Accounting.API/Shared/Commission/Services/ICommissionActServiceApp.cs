using System.Collections.Generic;
using System.Threading.Tasks;
using Adacta.AdInsure.Framework.Core.Domain.Common;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Responses;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Services
{
    public interface ICommissionActServiceApp
    {
        CommissionActCreateResponse Create(CommissionAct act);
        void CreateOrUpdate(CommissionAct act);
        void Update(CommissionAct act);
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        Task SetStatus(CommissionActSetStatusRequest request);
        Task SetStatusGroup(CommissionActSetStatusGroupRequest request);
        Task<AutoPopulateResponse> AutoPopulate(AutoPopulateRequest request);
        Task<PopulateWithFileResponse> PopulateWithFile(PopulateWithFileRequest request);
        void Clear(CommissionActClearRequest request);
        void AnnulItem(AnnulItemRequest request);
        Task RenewItem(RenewItemRequest request);
        void ChangeItemCommRate(ChangeItemCommRateRequest request);
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void UpdateActHeader(UpdateActHeaderRequest request);
        void MigrateActHistory(string actNo);
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void UpdateItemJson(ActUpdateItemJsonRequest request);
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        InvoicedCommissionResponse GetInvoicedCommission(List<InvoicedCommissionRequest> invoicedCommissionRequest);
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        InstallmentAmountsResponse GetInstallmentAmounts(IList<InstallmentAmountsRequest> installmentAmountsRequest);
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void UpdateItemStatus(long actId, CommissionActItemStatusId newStatus, IList<long> itemIds);
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void InsertActItem(List<CommissionActItem> actItems);
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void InsertActItemPc(List<CommissionActItemPc> actItemPcs);
    }
}
