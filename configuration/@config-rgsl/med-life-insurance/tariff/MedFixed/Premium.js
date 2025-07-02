
'use strict';

const medFixedConfig = require('./rules/medFixedConfig');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { getMainRiskCode } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function Premium(input) {

    const { productCode, paymentFrequency, risks, currency, contractIssueDate, productConfigurationData } = input;

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

    const riskData = risks.map(r => {
        const fixedConfig = medFixedConfig({ productCode, riskCode: r.risk.riskCode });
        const productConf = productConfigurationData;
        return {
            riskCode: getValue(r, 'risk.riskCode'),
            startDate: r.startDate,
            endDate: r.endDate,
            isAdditional: r.isAdditional,
            sumInsured: fixedConfig.sumInsured || 0,
            premium: fixedConfig.premium || 0,
            isLife: r.risk.isLife,
            withoutProduct: r.risk.withoutProduct ?? false,
            maxInsuredSum: productConf.maxInsuredSumMainRisk
        };
    });

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
