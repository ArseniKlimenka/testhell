using Adacta.AdInsure.RGSL.Common.Domain.Transaction.Interfaces;
using Spring.Transaction;
using System;

namespace Adacta.AdInsure.RGSL.Common.Domain.Transaction.Services
{
    public class TransactionHolderRgsl : ITransactionHolderRgsl
    {
        private readonly IPlatformTransactionManager _platformTransactionManager;
        private readonly ITransactionStatus _transactionState;
        private bool _disposedValue;

        public TransactionHolderRgsl(IPlatformTransactionManager platformTransactionManager, ITransactionStatus transactionState)
        {
            _platformTransactionManager = platformTransactionManager;
            _transactionState = transactionState;
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposedValue)
            {
                if (disposing)
                {
                    Rollback();
                }

                _disposedValue = true;
            }
        }

        ~TransactionHolderRgsl()
        {
            Dispose(disposing: false);
        }

        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }

        public void Commit()
        {
            if (_transactionState.IsNewTransaction && !_transactionState.Completed)
            {
                _platformTransactionManager.Commit(_transactionState);
            }
        }

        public void Rollback()
        {
            if (_transactionState.IsNewTransaction && !_transactionState.Completed)
            {
                _platformTransactionManager.Rollback(_transactionState);
            }
        }
    }
}
