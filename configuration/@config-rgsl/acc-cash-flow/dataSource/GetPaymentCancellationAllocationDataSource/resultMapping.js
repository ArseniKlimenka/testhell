module.exports = function resultMapping(input) {

    const allocations = input.ALLOCATIONS ? JSON.parse(input.ALLOCATIONS) : undefined;
    const ret = {
        recordKey: input.RECORD_KEY,
        bankStatementItemId: input.BANK_STATEMENT_ITEM_ID,
        paymentStatusId: input.STATUS_ID,
        paymentErrorMessage: input.PAYMENT_ERROR_MESSAGE,
        allocations: allocations,
    };
    return ret;
};
