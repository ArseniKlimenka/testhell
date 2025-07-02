'use strict';

module.exports = function resultMapping(input) {

    return {
        bankStatementItemId: input.BANK_STATEMENT_ITEM_ID,
        bankStatementItemAmount: input.BANK_STATEMENT_ITEM_AMOUNT,
        bankStatementItemDirection: input.BANK_STATEMENT_ITEM_DIRECTION,
        allocationDocumentNo: input.ALLOCATION_DOCUMENT_NO,
        allocationPayAmountSum: input.ALLOCATION_PAY_AMOUNT_SUM,
    };
};
