module.exports = function resultMapping(input) {

    const output = {};

    output.riskCode = input.CODE;
    output.risksGroup = input.RISKS_GROUP;

    return output;

};
