module.exports = function resultMapping(input) {

    const isInsuranceAmount = input.PAYMENT_FORM == 'InsuranceAmount';
    const isSurrenderValues = input.PAYMENT_FORM == 'SurrenderValues';
    const isWOP = input.PAYMENT_FORM == 'WOP';

    const output = {};

    output.riskCode = input.CODE;
    output.riskType = input.TYPE;
    output.isLife = input.IS_LIFE;
    output.riskShortDescription = input.SHORT_DESCRIPTION;
    output.riskFullDescription = input.FULL_DESCRIPTION;
    output.riskGroup = input.RISKS_GROUP;
    output.riskPaymentForm = input.PAYMENT_FORM;
    output.isInsuranceAmount = isInsuranceAmount;
    output.isSurrenderValues = isSurrenderValues;
    output.isWOP = isWOP;

    return output;
};
