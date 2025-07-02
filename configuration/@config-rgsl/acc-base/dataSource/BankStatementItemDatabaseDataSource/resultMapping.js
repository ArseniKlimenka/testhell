module.exports = function resultMapping(input) {
    return {
        bankStatementItemId: input.BANK_STATEMENT_ITEM_ID,
        importDocumentId: input.IMPORT_DOCUMENT_ID,
        bankStatementItemNo: input.BANK_STATEMENT_ITEM_NO,
        incomeSourceId: input.INCOME_SOURCE_ID,
        incomeSourceName: input.INCOME_SOURCE_NAME,
        description: input.PAYMENT_DESCRIPTION,
        originalDescription: input.ORIGINAL_PAYMENT_DESCRIPTION,
        transactionDate: input.TRANSACTION_DATE,
        amount: input.AMOUNT,
        direction: input.DIRECTION,
        currencyCode: input.CURRENCY_CODE,
        paymentStatusId: input.STATUS_ID,
        openAmount: input.OPEN_AMOUNT,
        isRegistry: input.IS_REGISTRY,
        isAcquiring: input.IS_ACQUIRING,
        createDate: input.CREATE_DATE,
        paymentDate: input.PAYMENT_DATE,
        nonAcceptance: input.NON_ACCEPTANCE,
        toleranceType: input.TOLERANCE_TYPE,
        debtorName: input.DEBTOR_NAME,
        debtorType: input.DEBTOR_TYPE,
        debtorAccountNo: input.DEBTOR_BANK_ACCOUNT_NO,
        debtorTin: input.DEBTOR_TIN,
        debtorBic: input.DEBTOR_BIC,
        creditorName: input.CREDITOR_NAME,
        creditorType: input.CREDITOR_TYPE,
        creditorAccountNo: nullIfEmpty(input.CREDITOR_BANK_ACCOUNT_NO),
        creditorTin: input.CREDITOR_TIN,
        creditorBic: input.CREDITOR_BIC,
        referenceNumbers: input.REFERENCE_NUMBERS,
        lastDocumentNo: input.LAST_DOCUMENT_NO,
        rgslGuid: input.RGSL_GUID,
        segment: input.SEGMENT,
        paymentSourceId: input.PAYMENT_SOURCE_ID,
        reloadRequired: input.RELOAD_REQUIRED,
        registryFileFormat: input.REGISTRY_FILE_FORMAT
    };
};

function nullIfEmpty(value) {
    if (value === '')
    { return undefined; }

    return value;
}
