
'use strict';

const premiumCoefficients = require('./rules/reliableChoise2PremiumCoefficients');
const accumulatedPremiumCalc = require('@config-rgsl/accumulated-life-insurance/lib/accumulatedPremiumCalc');

const { getMainRiskCode } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function Premium(input) {

    const { productCode, paymentFrequency, term, insuredAgeOnIssueDate, insuredGender } = input;
    const mainRiskCode = getMainRiskCode(productCode);

    const mandatoryRisksCoeff = premiumCoefficients({ productCode, paymentFrequency, contractTerm: term, insuredAge: insuredAgeOnIssueDate, insuredGender });

    return accumulatedPremiumCalc.premiumCalculation({ input, mainRiskCode, mandatoryRisksCoeff });

};
