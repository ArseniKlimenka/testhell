using Spring.Transaction;

namespace Adacta.AdInsure.RGSL.Common.Domain.Transaction.Interfaces
{
    public interface ITransactionManagerRgsl
    {
        ITransactionHolderRgsl GetTransaction(TransactionPropagation transactionPropagation);
    }
}
