const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const { preEquityMinShare } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = async function onChangeSum(input, ambientProperties) {

    const body = input.rootContext.Body;
    const risks = body?.risks;
    const mainRisk = risks && risks.find(item => item?.risk?.riskOrder == 1);
    const mainRiskPremium = mainRisk?.riskPremium;
    const initialSum = input?.context?.sum;

    const netAssetsAmount = body?.contract?.assets?.netAssetsAmount;
    let premiumForFinalSum = mainRiskPremium;
    if (netAssetsAmount) {
        premiumForFinalSum = netAssetsAmount;
    }

    const calculatedShare = round(initialSum / premiumForFinalSum, 4);
    let finalShare = calculatedShare;
    if (calculatedShare < preEquityMinShare.value) {
        finalShare = preEquityMinShare.value;
        const message = `Доля суммы размещения в стратегии не должна быть меньше ${preEquityMinShare.text}`;
        ambientProperties.services.confirmationDialog.showNotification(message, 'OK', 'OK', 1);
    }

    const finalSum = round(finalShare * premiumForFinalSum, 2);

    input.context.sum = undefined;
    input.context.share = undefined;

    await this.view.rebind();

    input.context.sum = finalSum;
    input.context.share = finalShare;

    await this.view.rebind();

};
