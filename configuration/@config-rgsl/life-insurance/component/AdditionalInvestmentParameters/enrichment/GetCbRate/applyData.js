"use strict";

const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function mapping(input, dataSource) {

    if ((dataSource?.data?.length ?? 0) === 0) {
        return;
    }

    const body = this?.businessContext?.rootData;
    const productConfiguration = body?.productConfiguration;
    const coolOffDIDRate = productConfiguration?.coolOffDIDRate;
    const coolOffPeriodDays = productConfiguration?.coolOffPeriodDays;
    const riskPremium = body?.basicConditions?.riskPremium;
    const cbRate = dataSource.data[0].resultData.cbRate;

    if (riskPremium && coolOffPeriodDays && cbRate && coolOffDIDRate) {
        const coolOffDID = round(riskPremium * (coolOffPeriodDays / 365) * (cbRate / 100 - coolOffDIDRate), 2);
        body.additionalInvestmentParameters.coolOffDIDRate = coolOffDIDRate;
        body.additionalInvestmentParameters.coolOffDID = coolOffDID;
    }

};

