const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const { getMainRiskCode } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function Premium(input) {

    const { productCode, paymentFrequency, risks, currency, installmentAmount, paymentPlan, manualCorrection } = input;

    const mainRiskCode = getMainRiskCode(productCode);
    const tariffRate = 0;
    let riskData = {};
    let calculatedRisks = {};

    if (manualCorrection) {

        // just provide values from UI
        riskData = risks.map(r => {
            return {
                riskCode: getValue(r, 'risk.riskCode'),
                isLife: r.risk.isLife,
                withoutProduct: r.risk.withoutProduct ?? false,
                startDate: r.startDate,
                endDate: r.endDate,
                isAdditional: r.isAdditional,
                sumInsured: r.riskInsuredSum || 0,
                premium: r.riskPremium || 0
            };
        });

        // this part is required by platform schems and surrender value calculation
        calculatedRisks = initCalculatedRisks();

    }
    else {

        // fake tarification
        riskData = risks.map(r => {
            return {
                riskCode: getValue(r, 'risk.riskCode'),
                isLife: r.risk.isLife,
                withoutProduct: r.risk.withoutProduct ?? false,
                startDate: r.startDate,
                endDate: r.endDate,
                isAdditional: r.isAdditional,
                sumInsured: installmentAmount || 0,
                premium: round(installmentAmount / risks.length) || 0
            };
        });

        calcRoundingCorrection();

        // this part is required by platform schems and surrender value calculation
        calculatedRisks = initCalculatedRisks();

    }

    function initCalculatedRisks() {
        return riskData
            && riskData.map(r => {
                return {
                    code: r.riskCode,
                    sumInsured: r.sumInsured
                };
            });
    }

    function calcRoundingCorrection() {
        riskData.forEach(item => {
            item.sumInsured = round(item.sumInsured, 2);
            item.premium = round(item.premium, 2);
        });
        const totalCalculatedPremium = round(riskData.reduce((acc, v) => acc += v.premium, 0), 2);
        const differenceBetweenCalcAndManualValues = round(installmentAmount - totalCalculatedPremium, 2);
        riskData.find(r => r.riskCode == mainRiskCode).premium += differenceBetweenCalcAndManualValues;
        riskData.find(r => r.riskCode == mainRiskCode).premium = round(riskData.find(r => r.riskCode == mainRiskCode).premium, 2);
    }

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
