
'use strict';

const premiumCoefficients = require('./rules/healthVectorPremiumCoefficients');
const accumulatedPremiumCalc = require('@config-rgsl/accumulated-life-insurance/lib/accumulatedPremiumCalc');
const { getMainRiskCode } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function Premium(input) {


    const { productCode, paymentFrequency, installmentAmount } = input;
    const mandatoryRisksCoeff = premiumCoefficients({ productCode, paymentFrequency, installmentAmount });
    const mainRiskCode = getMainRiskCode(productCode);

    return accumulatedPremiumCalc.premiumCalculation({ input, mainRiskCode, mandatoryRisksCoeff });

};
