module.exports = function resultMapping(input) {
    return {
        bankStatementItemId: input.BANK_STATEMENT_ITEM_ID,
        referenceNumbers: input.REFERENCE_NUMBERS,
    };
};
