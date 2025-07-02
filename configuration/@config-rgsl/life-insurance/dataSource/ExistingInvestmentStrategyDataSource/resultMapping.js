module.exports = function resultMapping(input) {

    const output = {};

    output.strategyCode = input.STRATEGY_CODE;
    output.strategyDescription = input.STRATEGY_DESCRIPTION;

    return output;

};
