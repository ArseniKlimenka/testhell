module.exports = function resultMapping(input) {
    return {
        historyId: input.BANK_STATEMENT_ITEM_HISTORY_ID,
        username: input.USERNAME,
        createDate: input.CREATE_DATE,
        statusIdFrom: input.STATUS_ID_FROM,
        statusIdTo: input.STATUS_ID_TO,
        paymentDescriptionFrom: input.PAYMENT_DESCRIPTION_FROM,
        paymentDescriptionTo: input.PAYMENT_DESCRIPTION_TO,
    };
};
