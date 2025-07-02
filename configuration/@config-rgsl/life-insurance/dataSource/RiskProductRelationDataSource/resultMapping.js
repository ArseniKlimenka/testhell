module.exports = function resultMapping(input) {

    const output = {};

    output.riskCode = input.CODE;
    output.riskType = input.TYPE;
    output.isLife = input.IS_LIFE;
    output.riskShortDescription = input.SHORT_DESCRIPTION;
    output.riskFullDescription = input.FULL_DESCRIPTION;
    output.isReplaceable = input.IS_REPLACEABLE;
    output.conditionsFunction = input.CONDITIONS_FUNCTION;
    output.riskOrder = input.RISK_ORDER;
    output.riskProgram = input.RISK_PROGRAM;
    output.riskPerson = input.RISK_PERSON;
    output.productCode = input.PRODUCT_CODE;
    output.withoutProduct = !!input.IS_WITHOUT_PRODUCT;
    output.risksGroup = input.RISKS_GROUP;
    return output;
};
