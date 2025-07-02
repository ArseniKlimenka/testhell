using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Subledger.Requests
{
    public class PostTransactionRequest
    {
        public IList<PostTransactionJournal> Journals { get; set; }
        public Guid? BusinessEventId { get; set; }
    }
    public class PostTransactionJournal
    {
        public int? JournalTypeId { get; set; }
        public DateTime ProposedPostingDate { get; set; }
        public string CurrencyCode { get; set; }
        public int DocumentTypeId { get; set; }
        public string PostingDescription { get; set; }
        public string DocumentNo { get; set; }
        public IList<PostTransactionLine> Lines { get; set; }
    }

    public class PostTransactionLine
    {
        public string ContractNumber { get; set; }
        public string MainContractNumber { get; set; }
        public string SourceLineId { get; set; }
        public decimal Amount { get; set; }
        public PostTransactionLineAttrs Attributes { get; set; }
    }

    public class PostTransactionLineAttrs
    {
        public long? BankStatementItemId { get; set; }
        public long? CommissionActId { get; set; }
        public string ContractNumber { get; set; }
        public string PaymentOrderNumber { get; set; }
        public bool IsRevaluation { get; set; }
        public string DocCurrencyCode { get; set; }
        public TransactionTypeEnum TransactionTypeId { get; set; }
        public string DocumentNo { get; set; }
        public decimal? CommissionRate { get; set; }
        public string CancelledDocumentNo { get; set; }
        public DateTime? DateToCheckPrevPeriod { get; set; }
        public bool UseAgentCodes { get; set; }
        public string ServiceProviderCode { get; set; }
        public string PartyCode { get; set; }
    }
}
