
'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const { getMainRiskCode } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function Premium(input) {

    const { productCode, paymentFrequency, term, insuredAgeOnIssueDate, insuredGender,
        risks, currency, installmentAmount, paymentPlan, manualCorrection, contractIssueDate, insuredSumAmount,
        calcFromInsuredSum } = input;

    const mainRiskCode = getMainRiskCode(productCode);
    const tariffRate = 0;

    const riskData = risks.map(r => {
        return {
            riskCode: getValue(r, 'risk.riskCode'),
            startDate: r.startDate,
            endDate: r.endDate,
            isAdditional: r.isAdditional,
            sumInsured: r.riskInsuredSum || 0,
            premium: r.riskPremium || 0,
            isLife: r.risk.isLife,
            withoutProduct: r.risk.withoutProduct ?? false,
            maxInsuredSum: r.maxInsuredSumMainRisk
        };
    });

    const calculatedRisks = initCalculatedRisks(riskData);

    return {
        premium: round(paymentPlan.reduce((p, c) => p + c.paymentSum, 0), 2),
        paymentFrequency: paymentFrequency,
        tariffRate: tariffRate && round(tariffRate, 12),
        mainRisk: mainRiskCode,
        risks: calculatedRisks,
        calculatedAttributes: {
            riskData
        },
        currency: currency
    };
};

function initCalculatedRisks(riskData) {
    return riskData
        && riskData.map(r => {
            return {
                code: r.riskCode,
                sumInsured: r.sumInsured
            };
        });
}
