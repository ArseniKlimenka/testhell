module.exports = function resultMapping(input) {

    return {
        contractNumber: input.CONTRACT_NUMBER,
        currencyCode: input.CURRENCY_CODE,
        rsdAmount: input.RSD_AMOUNT,
    };
};
