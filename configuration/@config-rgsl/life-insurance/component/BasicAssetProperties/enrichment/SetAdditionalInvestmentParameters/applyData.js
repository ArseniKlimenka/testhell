'use strict';

module.exports = function applyData(input, dataSourceResponse) {

    const body = this?.businessContext?.rootData;
    const riskPremium = body?.basicConditions?.riskPremium;
    const investmentFrequency = input?.rateOfReturnEquityActives?.investmentFrequency;
    let count = riskPremium * investmentFrequency;

    if (!riskPremium || !investmentFrequency || count < 0 || !input?.assetProperties || input?.assetProperties.length === 0) {
        body.basicAssetProperties.assetUnitsCountOnClient = undefined;
        return;
    }

    count = count / input?.assetProperties[0]?.asset?.unitPurchasePrice;
    count = count / input?.assetProperties[0]?.asset?.bondDenominationInCurrency;

    body.basicAssetProperties.assetUnitsCountOnClient = count;
};
