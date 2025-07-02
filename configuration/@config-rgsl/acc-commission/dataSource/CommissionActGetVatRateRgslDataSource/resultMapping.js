module.exports = function resultMapping(input) {

    const result = input[0];

    return {
        vatRate: result?.VAT_RATE ?? 0,
    };
};
