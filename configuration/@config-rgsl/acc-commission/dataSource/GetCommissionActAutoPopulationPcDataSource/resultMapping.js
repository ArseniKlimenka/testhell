module.exports = function resultMapping(input) {

    return {
        payableCommissionId: input.PAYABLE_COMMISSION_ID,
        cancelledPcId: input.CANCELLED_PC_ID,
        documentNo: input.DOCUMENT_NO,
        docCurrencyCode: input.DOC_CURRENCY_CODE,
        bankStatementItemId: input.BANK_STATEMENT_ITEM_ID,
        paymentTransactionDate: input.PAYMENT_TRANSACTION_DATE,
        installmentDueDate: input.INSTALLMENT_DUE_DATE,
        sourceLineId: input.SOURCE_LINE_ID,
        matchingDocAmount: input.MATCHING_DOC_AMOUNT,
        docCommRate: input.DOC_COMM_RATE,
        docExpensesRate: input.DOC_EXPENSES_RATE,
        docNpRate: input.DOC_NP_RATE,
        docSpRate: input.DOC_SP_RATE,
        issueFormCode: input.ISSUE_FORM_CODE,
        initiatorIsDbo: input.INITIATOR_IS_DBO,
        productGroup: input.PRODUCT_GROUP,
        isTechnical: input.IS_TECHNICAL,
        manualCommRate: input.MANUAL_COMM_RATE,
    };
};
