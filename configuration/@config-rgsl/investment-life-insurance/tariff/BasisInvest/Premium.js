
'use strict';

const premiumCoefficients = require('./rules/basisInvestPremiumCoefficients');
const investmentPremiumCalc = require('@config-rgsl/investment-life-insurance/lib/investmentPremiumCalc');
const { getMainRiskCode } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function Premium(input) {

    const { productCode, term, insuredAgeOnIssueDate } = input;
    const mainRiskCode = getMainRiskCode(productCode);

    const mandatoryRisksCoeff = premiumCoefficients({ productCode, contractTerm: term, insuredAge: insuredAgeOnIssueDate });

    return investmentPremiumCalc.premiumCalculation({ input, mainRiskCode, mandatoryRisksCoeff });

};
