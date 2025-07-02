const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function resultMapping(input) {

    return {
        allocationId: input.ALLOCATION_ID,
        documentTypeId: input.DOCUMENT_TYPE_ID,
        allocationDate: input.ALLOCATION_DATE ? dateUtils.formatDate(input.ALLOCATION_DATE) : undefined,
        entityType: input.ENTITY_TYPE,
        configurationName: input.CONFIGURATION_NAME,
        refDocumentNo: input.DOCUMENT_NO,
        paymentStatusId: input.PAY_STATUS_ID,
        transactionDate: input.TRANSACTION_DATE ? dateUtils.formatDate(input.TRANSACTION_DATE) : undefined,
        paymentDate: input.PAYMENT_DATE ? dateUtils.formatDate(input.PAYMENT_DATE) : undefined,
        payAmount: input.PAY_AMOUNT,
        payRate: input.PAY_RATE,
        docAmount: input.DOC_AMOUNT,
        exchangeDifference: input.EXCHANGE_DIFFERENCE,
        payCurrencyCode: input.PAY_CURRENCY_CODE,
        toleranceOverpayment: input.TOLERANCE_OVERPAYMENT,
        toleranceUnderpayment: input.TOLERANCE_UNDERPAYMENT,
        payerName: input.PAYER_NAME,
        fake: input.FAKE,
        bsiNo: input.BANK_STATEMENT_ITEM_NO,
        bsiDescription: input.PAYMENT_DESCRIPTION,
        localCurrencyExchangeRate: input.LOC_CURR_EXCHANGE_RATE,
        cbRate: input.CB_RATE
    };
};
