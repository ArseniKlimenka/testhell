using System;
using System.Globalization;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Subledger.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces.Posting;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services.Strategy.Policy;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.Domain.Journal.Interfaces;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services.Posting
{
    public class PolicyMatchingPostingServiceRGSL : IPolicyMatchingPostingServiceRGSL
    {
        private const string TOLERANCE_POSTFIX = "-TOL";

        private readonly IGeneralJournalServiceRgsl _generalJournalServiceRgsl;

        public PolicyMatchingPostingServiceRGSL(
            IGeneralJournalServiceRgsl generalJournalServiceRgsl
            )
        {
            _generalJournalServiceRgsl = generalJournalServiceRgsl;
        }

        public void PaymentAllocation(BankStatementItemRGSL bsi, AllocationRGSL allocation, MatchingRGSL matching, PolicyMatchingRGSL policyMatching, Guid businessEventId)
        {
            bool isDebit = bsi.Direction == BankStatementItemDirectionRGSL.Outgoing;
            string matchingIdStr = matching.MatchingId.Value.ToString(CultureInfo.InvariantCulture);
            string cancelledMatchingIdStr = matching.CancelledMatchingId.HasValue ? matching.CancelledMatchingId.Value.ToString(CultureInfo.InvariantCulture) : null;

            int documentType;
            if (bsi.PaymentSourceId == BankStatementItemPaymentSourceIdRGSL.PaymentOrder)
            {
                documentType = DocumentTypeConstsRGSL.PaymentAllocationNetting1;
            }
            else
            {
                documentType = policyMatching.IsAdvancePayment ? DocumentTypeConstsRGSL.AdvancePaymentAllocation : DocumentTypeConstsRGSL.PaymentAllocation;
            }

            _generalJournalServiceRgsl.CreatePaymentAllocationTransaction(bsi.BankStatementItemId.Value, allocation.DocumentNo, matchingIdStr, bsi.TransactionDate, policyMatching.PostAmount, allocation.DocCurrencyCode, isDebit, businessEventId, policyMatching.SourceLineId, cancelledMatchingIdStr, documentType);
        }

        public void Post(BankStatementItemRGSL bsi, AllocationRGSL allocation, PolicyAllocationRGSL policyAllocation, MatchingRGSL matching, PolicyMatchingRGSL policyMatching, Guid businessEventId)
        {
            if (matching.DocAmount != 0)
            {
                PostPaymentTransaction(bsi, allocation, matching, policyMatching, businessEventId);
            }

            bool isDebit = bsi.Direction == BankStatementItemDirectionRGSL.Outgoing;

            if (matching.ToleranceDocAmount != 0m)
            {
                string sourceDocumentNo = policyMatching.MatchingId.Value.ToString(CultureInfo.InvariantCulture) + TOLERANCE_POSTFIX;
                string cancelledDocumentNo = matching.CancelledMatchingId.HasValue ? matching.CancelledMatchingId.Value.ToString(CultureInfo.InvariantCulture) + TOLERANCE_POSTFIX : null;
                _generalJournalServiceRgsl.CreatePaymentAllocationTransaction(
                    bsi.BankStatementItemId.Value,
                    allocation.DocumentNo,
                    sourceDocumentNo,
                    bsi.TransactionDate > policyMatching.PostingDate ? bsi.TransactionDate : policyMatching.PostingDate,
                    matching.ToleranceDocAmount,
                    allocation.DocCurrencyCode,
                    isDebit,
                    businessEventId,
                    policyMatching.SourceLineId,
                    cancelledDocumentNo,
                    matching.ToleranceDocAmount > 0m ? DocumentTypeConstsRGSL.ToleranceUnderpayment : DocumentTypeConstsRGSL.ToleranceOverpayment);
            }
        }

        public void PostCancellation(BankStatementItemRGSL bsi, AllocationRGSL allocation, MatchingRGSL matching, PolicyMatchingRGSL policyMatching, Guid businessEventId)
        {
            if (!policyMatching.IsPosted)
            {
                return;
            }

            if (matching.DocAmount != 0)
            {
                PostPaymentTransaction(bsi, allocation, matching, policyMatching, businessEventId);
            }

            bool isDebit = bsi.Direction == BankStatementItemDirectionRGSL.Outgoing;

            if (matching.ToleranceDocAmount != 0m)
            {
                string sourceDocumentNo = policyMatching.MatchingId.Value.ToString(CultureInfo.InvariantCulture) + TOLERANCE_POSTFIX;
                string cancelledDocumentNo = matching.CancelledMatchingId.HasValue ? matching.CancelledMatchingId.Value.ToString(CultureInfo.InvariantCulture) + TOLERANCE_POSTFIX : null;
                _generalJournalServiceRgsl.CreatePaymentAllocationTransaction(
                    bsi.BankStatementItemId.Value,
                    allocation.DocumentNo,
                    sourceDocumentNo,
                    bsi.TransactionDate > policyMatching.PostingDate ? bsi.TransactionDate : policyMatching.PostingDate,
                    matching.ToleranceDocAmount,
                    allocation.DocCurrencyCode,
                    isDebit,
                    businessEventId,
                    policyMatching.SourceLineId,
                    cancelledDocumentNo,
                    matching.ToleranceDocAmount < 0m ? DocumentTypeConstsRGSL.ToleranceUnderpayment : DocumentTypeConstsRGSL.ToleranceOverpayment);
            }
        }

        private void PostPaymentTransaction(BankStatementItemRGSL bsi, AllocationRGSL allocation, MatchingRGSL matching, PolicyMatchingRGSL policyMatching, Guid businessEventId)
        {
            bool isDebit = bsi.Direction == BankStatementItemDirectionRGSL.Outgoing;
            string matchingIdStr = matching.MatchingId.Value.ToString(CultureInfo.InvariantCulture);
            string cancelledMatchingIdStr = matching.CancelledMatchingId?.ToString(CultureInfo.InvariantCulture);

            if (bsi.PaymentSourceId == BankStatementItemPaymentSourceIdRGSL.PaymentOrder)
            {
                _generalJournalServiceRgsl.CreatePaymentAllocationTransaction(bsi.BankStatementItemId.Value, allocation.DocumentNo, matchingIdStr, bsi.TransactionDate, policyMatching.PostAmount, allocation.DocCurrencyCode, isDebit, businessEventId, policyMatching.SourceLineId, cancelledMatchingIdStr, DocumentTypeConstsRGSL.PaymentAllocationNetting2);
            }
            else
            {
                if (bsi.PaymentSourceId == BankStatementItemPaymentSourceIdRGSL.RSD)
                {
                    _generalJournalServiceRgsl.CreatePaymentAllocationTransaction(bsi.BankStatementItemId.Value, allocation.DocumentNo, matchingIdStr, policyMatching.PostingDate, policyMatching.PostAmount, allocation.DocCurrencyCode, isDebit, businessEventId, policyMatching.SourceLineId, cancelledMatchingIdStr, DocumentTypeConstsRGSL.RsdApproved, TransactionTypeEnum.RSD);
                    _generalJournalServiceRgsl.CreatePaymentAllocationTransaction(bsi.BankStatementItemId.Value, allocation.DocumentNo, matchingIdStr, policyMatching.PostingDate, policyMatching.PostAmount, allocation.DocCurrencyCode, isDebit, businessEventId, policyMatching.SourceLineId, cancelledMatchingIdStr, DocumentTypeConstsRGSL.RsdPaymentAllocation, TransactionTypeEnum.RSD);
                }

                if (policyMatching.IsAdvancePayment)
                {
                    var documentType = DocumentTypeConstsRGSL.AdvancePaymentPosted;

                    _generalJournalServiceRgsl.CreatePaymentAllocationTransaction(bsi.BankStatementItemId.Value, allocation.DocumentNo, matchingIdStr, policyMatching.PostingDate, policyMatching.PostAmount, allocation.DocCurrencyCode, isDebit, businessEventId, policyMatching.SourceLineId, cancelledMatchingIdStr, documentType);
                }
            }
        }
    }
}
