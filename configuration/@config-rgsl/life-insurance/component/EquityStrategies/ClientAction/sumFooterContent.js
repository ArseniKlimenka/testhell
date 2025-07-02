const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function sumFooterContent(input) {

    const body = input.context.Body;

    const risks = body?.risks;
    const mainRisk = risks && risks.find(item => item?.risk?.riskOrder == 1);
    const mainRiskPremium = mainRisk?.riskPremium;

    const netAssetsAmount = body?.contract?.assets?.netAssetsAmount;
    let premiumForFinalSum = mainRiskPremium;
    if (netAssetsAmount) {
        premiumForFinalSum = netAssetsAmount;
    }

    const equityStrategies = body?.equityStrategies || [];
    const usedSum = round(equityStrategies.reduce((acc, v) => acc += v.sum, 0), 2);
    const restOfSum = round(premiumForFinalSum - usedSum, 2);

    return {
        restOfSum: restOfSum
    };

};
