using System;

namespace Adacta.AdInsure.RGSL.Common.Domain.Transaction.Interfaces
{
    public interface ITransactionHolderRgsl : IDisposable
    {
        void Commit();
    }
}
