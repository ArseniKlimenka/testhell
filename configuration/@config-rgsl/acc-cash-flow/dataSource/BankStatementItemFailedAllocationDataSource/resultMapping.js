module.exports = function resultMapping(input) {

    return {
        bankStatementItemId: input.BANK_STATEMENT_ITEM_ID,
        referenceNo: input.REFERENCE_NO,
        errorCode: input.ERROR_CODE,
        errorMessage: input.ERROR_MESSAGE,
        lastUpdated: input.LAST_UPDATED,
    };
};
