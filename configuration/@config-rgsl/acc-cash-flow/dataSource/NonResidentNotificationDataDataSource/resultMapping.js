module.exports = function resultMapping(input) {

    return {
        dueDate: input.DUE_DATE,
        currencyCode: input.CURRENCY_CODE,
        amount: input.AMOUNT,
        currencyRate: input.CURR_RATE
    };
};
