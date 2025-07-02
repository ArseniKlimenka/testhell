'use strict';

module.exports = function resultMapping(input) {

    return {
        contractNumber: input.DOCUMENT_NO,
        allocationId: input.ALLOCATION_ID,
        bankStatementItemId: input.BANK_STATEMENT_ITEM_ID,
        payAmount: input.PAY_AMOUNT,
        docAmount: input.DOC_AMOUNT,
    };
};
