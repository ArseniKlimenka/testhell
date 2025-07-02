module.exports = function resultMapping(input) {

    const output = {};

    output.riskCode = input.CODE;
    output.riskType = input.TYPE;
    output.isLife = input.IS_LIFE;
    output.riskShortDescription = input.SHORT_DESCRIPTION;
    output.riskFullDescription = input.FULL_DESCRIPTION;
    output.businessLine = input.BUSINESS_LINE;
    output.risksGroup = input.RISKS_GROUP;

    return output;

};
