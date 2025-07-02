using System;
using System.Collections.Generic;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Responses;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Requests;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Repositories
{
    public interface ICommissionActRepository
    {
        decimal GetVatRate(string agentAgreementNumber, DateTime issueDate);
        void InsertAct(CommissionAct act);
        void InsertActItem(List<CommissionActItem> actItems);
        void InsertActItemPc(List<CommissionActItemPc> actItemPcs);
        void UpdateAct(CommissionAct act);
        void UpdateItemStatus(long actId, CommissionActItemStatusId newStatus, IList<long> itemIds);
        void MigrateActHistory(string actNo);
        void UpdateActHeader(long actId);
        void DeleteItems(long actId, IList<long> itemIds);
        void UnleashPcFromAct(long actId);
        void CancelActItems(long actId, IList<long> itemIds);
        void ChangeItemCommRate(CommissionActItem item);
        long GetActId(long actItemId);
        DateTime LockAct(long actId);
        IList<CommissionAct> GetActs(GetActsRequest request);
        IList<CommissionActItem> GetActItems(long actId, IList<long> itemIds, IList<string> documentNumbers, bool skipAnnulled);
        IList<ActAutoPopulationPc> GetAutoPopulationPc(CommissionAct act, IList<string> referenceNumbers);
        InstallmentAmountsResponse GetInstallmentAmounts(IList<InstallmentAmountsRequest> installmentAmountsRequest);
        void UpdateActItemJson(long itemId, string jsonData);
    }
}
