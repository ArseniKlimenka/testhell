
'use strict';

const premiumCoefficients = require('./rules/driverFixedPremiumPremiumCoefficients');
const investmentPremiumCalc = require('@config-rgsl/investment-life-insurance/lib/investmentPremiumCalc');
const { getMainRiskCode } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function Premium(input) {

    const { productCode, paymentFrequency, term } = input;
    const mainRiskCode = getMainRiskCode(productCode);

    const mandatoryRisksCoeff = premiumCoefficients({ productCode, paymentFrequency, contractTerm: term });

    return investmentPremiumCalc.premiumCalculation({ input, mainRiskCode, mandatoryRisksCoeff });

};
