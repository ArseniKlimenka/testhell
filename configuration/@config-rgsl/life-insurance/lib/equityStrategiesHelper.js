'use strict';

const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const { preEquityMinShare } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

function getFinalSumShare(input, ambientProperties, that, assetCurrentShare) {

    const body = input?.rootContext?.Body;
    const risks = body?.risks;
    const mainRisk = risks && risks.find(item => item?.risk?.riskOrder == 1);
    const mainRiskPremium = mainRisk?.riskPremium;
    const initialShare = input?.context?.share ?? assetCurrentShare;

    const netAssetsAmount = body?.contract?.assets?.netAssetsAmount;
    let premiumForFinalSum = mainRiskPremium;
    if (netAssetsAmount) {
        premiumForFinalSum = netAssetsAmount;
    }

    let finalShare = initialShare;
    if (initialShare && initialShare < preEquityMinShare.value) {
        finalShare = preEquityMinShare.value;
        const message = `Доля суммы размещения в стратегии не должна быть меньше ${preEquityMinShare.text}`;
        ambientProperties.services.confirmationDialog.showNotification(message, 'OK', 'OK', 1);
    }

    const finalSum = round(finalShare * premiumForFinalSum, 2);

    return {
        finalSum,
        finalShare
    };
}

module.exports = {
    getFinalSumShare
};
