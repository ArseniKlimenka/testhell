
'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function Premium(input) {

    const { paymentFrequency, risks, currency, paymentPlan } = input;

    let riskData = {};
    let calculatedRisks = {};

    // just provide values from UI
    riskData = risks &&
        risks.map(r => {
            return {
                riskCode: getValue(r, 'risk.riskCode'),
                startDate: r.startDate,
                endDate: r.endDate,
                isAdditional: r.isAdditional,
                sumInsured: r.riskInsuredSum || 0,
                sumInsuredByPeriod: r.riskInsuredSumByPeriod,
                premium: r.riskPremium || 0,
                isLife: r.risk.isLife,
                withoutProduct: r.risk.withoutProduct ?? false
            };
        });

    // this part is required by platform schems and surrender value calculation
    calculatedRisks = riskData &&
        riskData.map(r => {
            return {
                code: r.riskCode,
                sumInsured: r.sumInsured
            };
        });

    return {
        premium: round(paymentPlan.reduce((p, c) => p + c.paymentSum, 0), 2),
        paymentFrequency: paymentFrequency,
        tariffRate: 0,
        mainRisk: riskData[0].riskCode,
        risks: calculatedRisks,
        calculatedAttributes: {
            riskData
        },
        currency: currency
    };

};
