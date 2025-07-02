using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Interfaces
{
    public interface ICommissionActService
    {
        long Create(CommissionAct act, bool createAsPaid);
        void Update(CommissionAct act);
        void CreateOrUpdate(CommissionAct act);
        Task SetStatus(long? actId, string actNo, DateTime? lastUpdated, string newState);
        void LockAct(long actId, DateTime? lastUpdated);
        void Clear(long? actId, string actNo, DateTime? lastUpdated);
        void AnnulItem(long? actId, string actNo, DateTime? lastUpdated, IList<AnnulItemRequestItem> items);
        void ChangeItemCommRate(IList<long> actItemIds, DateTime? lastUpdated, decimal? commRateManual, decimal? lcCommAmountManual);
        void UpdateActHeader(long actId);
        void MigrateActHistory(string actNo);
        void UpdateActItemJson(long itemId, string jsonData);
    }
}
