module.exports = function resultMapping(input) {

    const output = {};

    output.investmentStrategyCode = input.CODE;
    output.investmentStrategyDescription = input.DESCRIPTION;

    return output;

};
