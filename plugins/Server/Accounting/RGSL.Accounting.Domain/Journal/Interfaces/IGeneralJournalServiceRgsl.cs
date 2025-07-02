using System;
using System.Collections.Generic;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Subledger.Requests;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Journal.Interfaces
{
    public interface IGeneralJournalServiceRgsl
    {
        /// <summary>
        /// Creates general journal for posting money imported with bank statement.
        /// </summary>
        void CreatePostBSITransaction(long bsiId, string documentNo, DateTime postingDate, string bankAccountNo, decimal amount, string currencyCode, Guid businessEventId);

        /// <summary>
        /// Creates general journal for posting allocation transactions
        /// </summary>
        void CreatePaymentAllocationTransaction(long bsiId, string contractNumber, string sourceDocumentNo, DateTime postingDate, decimal amount, string currencyCode, bool isDebit, Guid businessEventId, string sourceLineId, string cancelledDocumentNo, int documentTypeId, TransactionTypeEnum transactionType = TransactionTypeEnum.PaymentAllocation);
    }
}
