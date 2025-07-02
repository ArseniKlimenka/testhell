'use strict';

module.exports = function resultMapping(input) {

    return {
        xmlMessageItemId: input.XML_MESSAGE_ITEM_ID,
        bankStatementItemId: input.BANK_STATEMENT_ITEM_ID,
        allocationId: input.ALLOCATION_ID,
        documentNo: input.DOCUMENT_NO
    };
};
