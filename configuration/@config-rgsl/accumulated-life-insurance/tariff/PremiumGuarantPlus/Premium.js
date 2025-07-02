
'use strict';

const premiumCoefficients = require('./rules/premiumGuarantPlusPremiumCoefficients');
const accumulatedPremiumCalc = require('@config-rgsl/accumulated-life-insurance/lib/accumulatedPremiumCalc');
const { getMainRiskCode } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function Premium(input) {

    const { productCode, paymentFrequency, term } = input;
    const contractTerm = term;
    const insuredAge = input.insuredAgeOnIssueDate;
    const insuredGender = input.insuredGender;
    const mainRiskCode = getMainRiskCode(productCode);

    // Mandatory risks
    const mandatoryRisksCoeff = premiumCoefficients({ productCode, paymentFrequency, contractTerm, insuredAge, insuredGender }) || {};

    return accumulatedPremiumCalc.premiumCalculation({ input, mainRiskCode, mandatoryRisksCoeff });

};
