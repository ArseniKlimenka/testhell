const { bankStatementItemStatusId } = require('@config-rgsl/acc-base/lib/bankStatementEnums');

module.exports = function resultMapping(input) {
    const notAllocatableStatuses = [
        bankStatementItemStatusId.CANCELLED,
        bankStatementItemStatusId.ALLOCATED_TO_REGISTRY,
    ];

    return {
        bankStatementItemId: input.BANK_STATEMENT_ITEM_ID,
        bankStatementItemNo: input.BANK_STATEMENT_ITEM_NO,
        incomeSourceId: input.INCOME_SOURCE_ID,
        description: input.PAYMENT_DESCRIPTION,
        originalDescription: input.ORIGINAL_PAYMENT_DESCRIPTION,
        transactionDate: input.TRANSACTION_DATE,
        createDate: input.CREATE_DATE,
        paymentDate: input.PAYMENT_DATE,
        amount: input.AMOUNT,
        direction: input.DIRECTION,
        paymentStatusId: input.STATUS_ID,
        currencyCode: input.CURRENCY_CODE,
        openAmount: notAllocatableStatuses.includes(input.STATUS_ID) ? 0 : input.OPEN_AMOUNT,
        documentNo: input.DOCUMENT_NO,
        dueDate: input.DUE_DATE,
        allocatedAmount: input.ALLOCATED_AMOUNT,
        isRegistry: input.IS_REGISTRY,
        isAcquiring: input.IS_ACQUIRING,
        nonAcceptance: input.NON_ACCEPTANCE,
        segment: input.SEGMENT,
        debtorName: input.DEBTOR_NAME,
        debtorType: input.DEBTOR_TYPE,
        debtorAccountNo: input.DEBTOR_BANK_ACCOUNT_NO,
        creditorName: input.CREDITOR_NAME,
        creditorType: input.CREDITOR_TYPE,
        creditorAccountNo: input.CREDITOR_BANK_ACCOUNT_NO,
        paymentSourceId: input.PAYMENT_SOURCE_ID,
        rgslGuid: input.RGSL_GUID,
        registryFileFormat: input.REGISTRY_FILE_FORMAT
    };
};
