const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { medFixedConfig } = require('@config-rgsl/collective-life-insurance/lib/medFixedConfig');

function calcMedFixedPremium(input) {

    const { productCode, risks, contractIssueDate } = input;

    const riskData = risks.map(r => {
        const fixedConfig = medFixedConfig({ productCode, riskCode: r.risk.riskCode });
        return {
            riskCode: getValue(r, 'risk.riskCode'),
            startDate: r.startDate,
            endDate: r.endDate,
            amount: fixedConfig.sumInsured || 0,
            premium: fixedConfig.premium || 0
        };
    });

    return riskData;
}

function calcPremium(input) {

    return calcMedFixedPremium(input);
}

module.exports = {
    calcPremium
};
