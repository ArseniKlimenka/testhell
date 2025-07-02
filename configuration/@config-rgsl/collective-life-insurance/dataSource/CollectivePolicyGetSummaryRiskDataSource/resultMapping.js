module.exports = function resultMapping(input) {

    const output = {};

    output.riskCode = input.RISK_CODE;
    output.amount = input.AMOUNT;
    output.premium = input.PREMIUM;

    return output;
};
