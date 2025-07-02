const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function applyData(input, dataSourceResponse) {

    const body = this.businessContext.rootData;
    const risks = body?.risks;
    const mainRisk = risks && risks.find(item => item?.risk?.riskOrder == 1);
    const mainRiskPremium = mainRisk?.riskPremium;

    const equityStrategies = body?.equityStrategies || [];
    equityStrategies.forEach(item => {
        const share = item?.share;
        item.sum = round(share * mainRiskPremium, 2);
    });

    body.equityStrategies = equityStrategies;

};
