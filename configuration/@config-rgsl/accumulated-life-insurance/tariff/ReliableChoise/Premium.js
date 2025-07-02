
'use strict';

const premiumCoefficients = require('./rules/reliableChoisePremiumCoefficients');
const accumulatedPremiumCalc = require('@config-rgsl/accumulated-life-insurance/lib/accumulatedPremiumCalc');

const { getMainRiskCode } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function Premium(input) {

    const { productCode, paymentFrequency, term } = input;
    const mainRiskCode = getMainRiskCode(productCode);

    const mandatoryRisksCoeff = premiumCoefficients({ productCode, paymentFrequency, contractTerm: term });

    return accumulatedPremiumCalc.premiumCalculation({ input, mainRiskCode, mandatoryRisksCoeff });

};
