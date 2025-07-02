module.exports = function resultMapping(input) {

    if (input.length === 1) {
        input = input[0];

        return {
            bankStatementItemId: input.BANK_STATEMENT_ITEM_ID,
            matchedDocAmount: input.MATCHED_DOC_AMOUNT,
            postedDocAmount: input.POSTED_DOC_AMOUNT,
        };
    }
};

