module.exports = function resultMapping(input) {

    return {
        configurationName: input.CODE_NAME,
        documentNo: input.DOCUMENT_NO,
        currencyCode: input.CURRENCY_CODE,
        poDate: input.PAYMENT_ORDER_DATE,
        recipientName: input.RECIPIENT_NAME,
        recipientCode: input.RECIPIENT_CODE,
        debtAmount: input.DEBT_AMOUNT,
        openDebtAmount: input.OPEN_DEBT_AMOUNT
    };
};
