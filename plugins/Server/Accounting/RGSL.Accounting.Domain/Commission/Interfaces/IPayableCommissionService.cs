using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Interfaces
{
    public interface IPayableCommissionService
    {
        void Create(string referenceNo, DateTime dueDate);
        void Cancel(string referenceNo, DateTime dueDate);
    }
}
