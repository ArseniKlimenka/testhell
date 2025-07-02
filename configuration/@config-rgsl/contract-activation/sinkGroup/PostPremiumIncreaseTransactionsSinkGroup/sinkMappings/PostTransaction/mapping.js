const guidHelper = require('@config-rgsl/infrastructure/lib/GuidHelper');
const { transactionTypeId } = require('@config-rgsl/acc-base/lib/attributeConsts');
const { documentType } = require('@config-rgsl/acc-base/lib/accConsts');

module.exports = function mapping(input, sinkExchange) {
    const invoices = sinkExchange.resolveContext('invoices');
    if (!invoices) {
        return;
    }

    const businessEventId = guidHelper.generate();
    const journals = [];
    for (const invoice of invoices) {
        const amount = invoice.lines.reduce((p, c) => p + c.amount, 0);
        const isCancellationTransaction = input.premiumEvent === 'cancellation' && invoice.polcyStartDate !== invoice.amendmentValidFrom && amount < 0;

        if (isCancellationTransaction) {
            // For cancellation amendment we should split transactions on paid part and not paid part. For the rest, we can use full amount.
            const notPaidAmount = invoice.lines.reduce((p, c) => p + c.amount + c.paidAmount, 0);
            const paidAmount = invoice.lines.reduce((p, c) => p - c.paidAmount, 0);
            if (notPaidAmount !== 0) {
                createJournal(input, invoice, amount, isCancellationTransaction, false, journals);
            }
            if (paidAmount !== 0) {
                createJournal(input, invoice, amount, isCancellationTransaction, true, journals);
            }
        } else {
            createJournal(input, invoice, amount, isCancellationTransaction, undefined, journals);
        }
    }

    return {
        request: {
            journals,
            businessEventId,
        }
    };
};

function createJournal(input, invoice, amount, isCancellationTransaction, isPaidPart, journals) {

    const isFinancialChangeTransaction = input.premiumEvent === 'financialChange';

    let documentTypeId = documentType.SALES_INVOICE;
    if (isCancellationTransaction) {
        documentTypeId = isPaidPart ? documentType.SALES_INVOICE_CANCELLATION_PAID : documentType.SALES_INVOICE_CANCELLATION_NOT_PAID;
    } else if (isFinancialChangeTransaction) {
        if (amount < 0) {
            documentTypeId = documentType.SALES_INVOICE_FINANCIAL_CHANGE;
        }
    }

    const journal = {
        proposedPostingDate: isCancellationTransaction ? (invoice.cancellationPostDate ?? invoice.postingDate) : invoice.postingDate,
        currencyCode: invoice.currencyCode,
        documentTypeId: documentTypeId,
        postingDescription: input.postingDescription,
        documentNo: invoice.invoiceNumber,
        lines: invoice.lines.map(line => {
            const amount = isCancellationTransaction ? (isPaidPart ? -line.paidAmount : line.amount + line.paidAmount) : line.amount; // in case of cancellation, amount is negative (and paid amount is positive number)
            return {
                contractNumber: line.contractNumber,
                mainContractNumber: line.mainContractNumber,
                amount: amount,
                sourceLineId: line.itemNo,
                attributes: {
                    bankStatementItemId: undefined,
                    commissionActId: undefined,
                    contractNumber: line.mainContractNumber,
                    paymentOrderNumber: undefined,

                    isRevaluation: false,
                    transactionTypeId: transactionTypeId.InsurancePremiumIncrease,
                    docCurrencyCode: undefined,
                    documentNo: line.contractNumber,
                    commissionRate: undefined,
                    cancelledDocumentNo: line.amount < 0 ? invoice.invoiceNumber : undefined,
                    dateToCheckPrevPeriod: isCancellationTransaction ? invoice.postingDate : undefined,
                    useAgentCodes: false,
                }
            };
        }),
    };

    if (journal.lines.length !== 0) {
        journals.push(journal);
    }
}
