using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Requests;
using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Repositories
{
    public interface IPayableCommissionRepository
    {
        void CreatePC(IList<PayableCommission> newPCs);
        IList<PayableCommission> GetPC(GetPcRequest request);
        void SetCancelled(IList<PayableCommission> pcsToCancel);
        bool IsMigrated(string documentNo, DateTime dueDate);
    }
}
