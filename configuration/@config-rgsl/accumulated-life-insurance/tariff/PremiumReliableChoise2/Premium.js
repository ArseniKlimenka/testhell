
'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const premiumCoefficients = require('./rules/premiumReliableChoise2PremiumCoefficients');
const criticalDiseasePremiumCoefficients = require('./rules/criticalDisease2PremiumCoefficients');
const accumulatedPremiumCalc = require('@config-rgsl/accumulated-life-insurance/lib/accumulatedPremiumCalc');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { getMainRiskCode } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function Premium(input) {

    const { productCode, paymentFrequency, term, insuredAgeOnIssueDate, insuredGender } = input;
    const contractTerm = term;
    const insuredAge = insuredAgeOnIssueDate;
    const mainRiskCode = getMainRiskCode(productCode);

    // Mandatory risks
    const mandatoryRisksCoeff = premiumCoefficients({ productCode, paymentFrequency, contractTerm, insuredAge, insuredGender }) || {};

    // Additional risks
    // CDP36102 - "КЗ" Первичное диагностирование застрахованному критического заболевания
    // HI36102 - "ТТП" Тяжкие телесные повреждения Застрахованного в результате несчастного случая
    const criticalDiseaseRisk = input.risks.find(item => item.risk && item.risk.riskCode == 'CD36404');
    const criticalDiseaseTerm = criticalDiseaseRisk && DateTimeUtils.getYearDifference(criticalDiseaseRisk.startDate, criticalDiseaseRisk.endDate) + 1;
    const criticalDisease = criticalDiseaseTerm && criticalDiseasePremiumCoefficients({ productCode, contractTerm: criticalDiseaseTerm, insuredGender });
    const additionalRisksCoeff = {
        CD36404: criticalDisease && criticalDisease[insuredAge] || 0,
        HI36404: 0.0016
    };

    return accumulatedPremiumCalc.premiumCalculation({ input, mainRiskCode, mandatoryRisksCoeff, additionalRisksCoeff });

};
