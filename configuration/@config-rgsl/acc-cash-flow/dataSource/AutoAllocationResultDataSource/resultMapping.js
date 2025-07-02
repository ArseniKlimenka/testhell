module.exports = function resultMapping(input) {
    const ret = {
        bankStatementItemId: input.BANK_STATEMENT_ITEM_ID,
        referenceNo: input.REFERENCE_NO,
        orderNo: input.ORDER_NO,
        autoAllocationMessage: input.AUTO_ALLOCATION_MESSAGE,
        isError: input.IS_ERROR
    };
    return ret;
};
