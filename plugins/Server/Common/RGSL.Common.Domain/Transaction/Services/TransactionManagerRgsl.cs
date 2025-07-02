using Adacta.AdInsure.RGSL.Common.Domain.Transaction.Interfaces;
using Spring.Transaction;
using Spring.Transaction.Support;

namespace Adacta.AdInsure.RGSL.Common.Domain.Transaction.Services
{
    public class TransactionManagerRgsl : ITransactionManagerRgsl
    {
        private readonly IPlatformTransactionManager _platformTransactionManager;

        public TransactionManagerRgsl(IPlatformTransactionManager platformTransactionManager)
        {
            _platformTransactionManager = platformTransactionManager;
        }

        public ITransactionHolderRgsl GetTransaction(TransactionPropagation transactionPropagation)
        {
            var transactionState = _platformTransactionManager.GetTransaction(new DefaultTransactionDefinition(transactionPropagation));
            var transactionHolder = new TransactionHolderRgsl(_platformTransactionManager, transactionState);
            return transactionHolder;
        }
    }
}
