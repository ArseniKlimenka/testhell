
'use strict';

const accidentFixedConfig = require('./rules/accidentFixedConfig');
const { getMainRiskCode } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function Premium(input) {

    const { productCode, paymentFrequency, risks, currency, contractIssueDate, productConfigurationData, insuranceTermsDays, insuredAgeOnStartDate, insuredSumAmount, sportTypes, manualCorrection } = input;

    const mainRiskCode = getMainRiskCode(productCode);
    const tariffRate = 0;

    const amendmentIssueDate = input.amendment?.attributes?.validFrom;
    const productConfOnAmendmentDate = input.amendment?.attributes?.productConfOnAmendmentDate;

    let productConfDate = undefined;

    if (!productConfOnAmendmentDate) {

        productConfDate = contractIssueDate;
    }
    else {

        productConfDate = amendmentIssueDate;
    }

    let riskData = {};

    if (manualCorrection) {
        // just provide values from UI
        riskData = risks &&
            risks.map(r => {
                return {
                    riskCode: r?.risk?.riskCode,
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

    } else {
        riskData = risks.map(r => {
            const res = [];
            sportTypes?.selectedTypes?.forEach(type => {
                const resultAccidentFixedConfig = accidentFixedConfig({ productCode, issueDate: productConfDate, insuranceTermsDays: insuranceTermsDays.value, insuredAge: insuredAgeOnStartDate, type: type.code, riskCode: r.risk.riskCode, sumInsured: insuredSumAmount });
                const premium = resultAccidentFixedConfig?.premium ?? 0;
                const sumInsuredRisk = resultAccidentFixedConfig?.sumInsuredRisk ?? 0;
                res.push({ premium, sumInsuredRisk });
            });
            const maxPremium = res.some(r => r.premium == 0) ? 0 : Math.max(...res.map(r => r.premium));
            const fileteredFixedConfig = res.filter(r => r.premium == maxPremium);
            const productConf = productConfigurationData;
            return {
                riskCode: r.risk?.riskCode,
                startDate: r.startDate,
                endDate: r.endDate,
                isAdditional: r.isAdditional,
                sumInsured: fileteredFixedConfig[0]?.sumInsuredRisk || 0,
                premium: fileteredFixedConfig[0]?.premium || 0,
                isLife: r.risk.isLife,
                withoutProduct: r.risk.withoutProduct ?? false,
                maxInsuredSum: productConf.maxInsuredSumMainRisk
            };
        });
    }

    const premiumValues = riskData.map(r => r.premium);
    const premiumTotal = premiumValues.reduce(
        (previousValue, currentValue) => previousValue + currentValue, 0
    );

    const calculatedRisks = initCalculatedRisks();

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
        premium: premiumTotal,
        paymentFrequency: paymentFrequency,
        tariffRate: tariffRate,
        mainRisk: mainRiskCode,
        risks: calculatedRisks,
        calculatedAttributes: {
            riskData
        },
        currency: currency
    };


};
