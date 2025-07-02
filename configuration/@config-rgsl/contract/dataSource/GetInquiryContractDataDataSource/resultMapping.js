'use strict';
const FormatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');

module.exports = function resultMapping(input) {

    const output = {};
    const body = JSON.parse(input.BODY);

    output.number = input.AMENDMENT_NUMBER;
    output.partnerShortDescription = body?.mainInsuranceConditions?.partner?.partnerShortDescription;
    output.policyHolderFullName = body?.policyHolder?.partyData?.partyFullName;
    output.productDescription = body?.mainInsuranceConditions?.insuranceProduct?.productDescription;
    output.riskPremium = FormatUtils.formatNumberToMoney(body?.basicConditions?.riskPremium);
    output.insuranceTerms = body?.basicConditions?.insuranceTerms;
    output.currencyDesc = body?.basicConditions?.currency?.currencyDesc;

    return output;
};
