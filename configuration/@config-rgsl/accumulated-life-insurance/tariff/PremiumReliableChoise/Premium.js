
'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const premiumCoefficients = require('./rules/premiumReliableChoisePremiumCoefficients');
const criticalDiseasePremiumCoefficients = require('./rules/criticalDiseasePremiumCoefficients');
const accumulatedPremiumCalc = require('@config-rgsl/accumulated-life-insurance/lib/accumulatedPremiumCalc');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { getMainRiskCode } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function Premium(input) {

    const { productCode, paymentFrequency, term } = input;
    const contractTerm = term;
    const insuredAgeOnIssueDate = input.insuredAgeOnIssueDate;
    const IsInsuredPolicyHolder = input.IsInsuredPolicyHolder;
    const insuredGender = input.insuredGender;
    const mainRiskCode = getMainRiskCode(productCode);

    // Mandatory risks
    const mandatoryRisksCoeff = premiumCoefficients({ productCode, paymentFrequency, contractTerm, insuredAgeOnStartDate: insuredAgeOnIssueDate, IsInsuredPolicyHolder }) || {};


    // Additional risks
    // CDP36102 - "КЗ" Первичное диагностирование застрахованному критического заболевания
    // HI36102 - "ТТП" Тяжкие телесные повреждения Застрахованного в результате несчастного случая
    const criticalDiseaseRisk = input.risks.find(item => item.risk && item.risk.riskCode == 'CDP36102');
    const criticalDiseaseTerm = criticalDiseaseRisk && DateTimeUtils.getYearDifference(criticalDiseaseRisk.startDate, criticalDiseaseRisk.endDate) + 1;
    const criticalDisease = criticalDiseaseTerm && criticalDiseasePremiumCoefficients({ productCode, paymentFrequency, contractTerm: criticalDiseaseTerm, insuredGender });
    const additionalRisksCoeff = {
        CDP36102: criticalDisease && criticalDisease[insuredAgeOnIssueDate] || 0,
        HI36102: 0.0016
    };

    return accumulatedPremiumCalc.premiumCalculation({ input, mainRiskCode, mandatoryRisksCoeff, additionalRisksCoeff });

};
