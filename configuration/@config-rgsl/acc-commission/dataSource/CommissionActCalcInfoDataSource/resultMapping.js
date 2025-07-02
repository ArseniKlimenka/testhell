module.exports = function resultMapping(input) {

    return {
        itemsCount: input.ITEMS_COUNT,
        commAmountLc: input.COMM_AMOUNT_LC,
        vatAmountLc: input.VAT_AMOUNT_LC,
    };
};
