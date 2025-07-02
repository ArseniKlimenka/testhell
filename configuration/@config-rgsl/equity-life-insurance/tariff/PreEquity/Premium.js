const premiumCoefficients = require('./rules/preEquityPremiumCoefficients');
const insuredSumCoefficients = require('./rules/preEquityInsuredSumCoefficients');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const { getMainRiskCode } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function Premium(input) {

    const { productCode, paymentFrequency, risks, currency, installmentAmount, paymentPlan, manualCorrection, term, insuredAgeOnIssueDate, investmentFrequency } = input;

    const premiumCoeffs = premiumCoefficients({ productCode, contractTerm: term, insuredAge: insuredAgeOnIssueDate });
    const insuredSumCoeffs = insuredSumCoefficients({ productCode, contractTerm: term, insuredAge: insuredAgeOnIssueDate });
    const mainRiskCode = getMainRiskCode(productCode);
    const tariffRate = 0;
    let riskData = {};
    let calculatedRisks = {};

    if (investmentFrequency) {
        premiumCoeffs[mainRiskCode] = investmentFrequency;
    }

    if (manualCorrection) {

        // just provide values from UI
        riskData = risks.map(r => {
            return {
                riskCode: r.risk?.riskCode,
                startDate: r.startDate,
                endDate: r.endDate,
                isAdditional: r.isAdditional,
                sumInsured: r.riskInsuredSum || 0,
                premium: r.riskPremium || 0,
                isLife: r.risk.isLife,
                withoutProduct: r.risk.withoutProduct ?? false,
            };
        });

        // this part is required by platform schems and surrender value calculation
        calculatedRisks = initCalculatedRisks();

    }
    else {

        // just provide values from UI
        riskData = risks.map(r => {

            const sumInsuredMax = insuredSumCoeffs[r.risk?.riskCode + 'MAX'];
            const insuredSumCoeff = insuredSumCoeffs[r.risk?.riskCode];
            const sumInsuredCalc = round(installmentAmount * insuredSumCoeff, 2) || 0;
            const sumInsuredFinal = sumInsuredMax ? Math.min(sumInsuredMax, sumInsuredCalc) : sumInsuredCalc;

            return {
                riskCode: r.risk?.riskCode,
                startDate: r.startDate,
                endDate: r.endDate,
                isAdditional: r.isAdditional,
                sumInsured: sumInsuredFinal,
                premium: round(installmentAmount * premiumCoeffs[r.risk?.riskCode], 2) || 0,
                isLife: r.risk.isLife,
                withoutProduct: r.risk.withoutProduct ?? false,
            };
        });

        // calculate main risk premium for rounding correction
        const totalSumInsuredExcludeDLPRisk = riskData
            .filter(r => r.riskCode != "DLP36914")
            .reduce((acc, v) => { acc += v.premium; return acc; }, 0);
        riskData.find(r => r.riskCode == mainRiskCode).premium = round(installmentAmount * premiumCoeffs[mainRiskCode], 2);
        riskData.find(r => r.riskCode == "DLP36914").premium = round(installmentAmount - totalSumInsuredExcludeDLPRisk, 2);

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
