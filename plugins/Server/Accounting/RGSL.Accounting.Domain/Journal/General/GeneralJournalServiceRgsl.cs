using System;
using System.Collections.Generic;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Subledger.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.Journal.Interfaces;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Journal.General
{
    public class GeneralJournalServiceRgsl : IGeneralJournalServiceRgsl
    {
        private readonly IJournalServiceRgsl _journalServiceRgsl;

        /// <summary>
        /// Creates generalJournalService.
        /// </summary>
        /// <param name="journalService"></param>
        public GeneralJournalServiceRgsl(IJournalServiceRgsl journalServiceRgsl)
        {
            _journalServiceRgsl = journalServiceRgsl;
        }

        /// <summary>
        /// Creates general journal for posting money imported with bank statement.
        /// </summary>
        /// <returns></returns>
        public void CreatePostBSITransaction(long bsiId, string documentNo, DateTime postingDate, string bankAccountNo, decimal amount, string currencyCode, Guid businessEventId)
        {
            var journal = new PostTransactionJournal();
            journal.DocumentNo = documentNo;
            journal.PostingDescription = bankAccountNo;
            journal.ProposedPostingDate = postingDate;
            journal.CurrencyCode = currencyCode;
            journal.DocumentTypeId = DocumentTypeConstsRGSL.BankStatementItem;
            journal.Lines = new List<PostTransactionLine>();

            var line = new PostTransactionLine()
            {
                ContractNumber = null,
                MainContractNumber = null,
                SourceLineId = null,
                Amount = amount,
                Attributes = new PostTransactionLineAttrs
                {
                    BankStatementItemId = bsiId,
                    TransactionTypeId = TransactionTypeEnum.PaymentAllocation,
                    IsRevaluation = false,
                    DocumentNo = documentNo,
                    CancelledDocumentNo = amount < 0 ? documentNo : null,
                }
            };
            journal.Lines.Add(line);

            _journalServiceRgsl.PostTransaction(new PostTransactionRequest
            {
                Journals = new List<PostTransactionJournal> { journal },
                BusinessEventId = businessEventId,
            });
        }

        public void CreatePaymentAllocationTransaction(long bsiId, string contractNumber, string sourceDocumentNo, DateTime postingDate, decimal amount, string currencyCode, bool isDebit, Guid businessEventId, string sourceLineId, string cancelledDocumentNo, int documentTypeId, TransactionTypeEnum transactionType)
        {
            var journal = new PostTransactionJournal();
            journal.DocumentNo = sourceDocumentNo;
            journal.ProposedPostingDate = postingDate;
            journal.CurrencyCode = currencyCode;
            journal.DocumentTypeId = documentTypeId;
            journal.Lines = new List<PostTransactionLine>();

            var line = new PostTransactionLine()
            {
                ContractNumber = contractNumber,
                MainContractNumber = contractNumber,
                SourceLineId = sourceLineId,
                Amount = amount,
                Attributes = new PostTransactionLineAttrs
                {
                    BankStatementItemId = bsiId,
                    ContractNumber = contractNumber,
                    TransactionTypeId = transactionType,
                    IsRevaluation = false,
                    DocumentNo = contractNumber,
                    CancelledDocumentNo = cancelledDocumentNo,
                }
            };
            journal.Lines.Add(line);

            _journalServiceRgsl.PostTransaction(new PostTransactionRequest
            {
                Journals = new List<PostTransactionJournal> { journal },
                BusinessEventId = businessEventId,
            });
        }
    }
}
