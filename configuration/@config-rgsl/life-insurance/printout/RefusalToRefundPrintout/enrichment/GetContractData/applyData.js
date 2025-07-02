'use strict';

const { getCaseStringFromNumber } = require('@config-rgsl/infrastructure/lib/FormatUtils');

module.exports = function mapping(input, dataSourceResponse) {

    if (dataSourceResponse &&
        dataSourceResponse.data &&
        dataSourceResponse.data[0] &&
        dataSourceResponse.data[0].resultData &&
        dataSourceResponse.data[0].resultData.body)
    {
        const body = dataSourceResponse.data[0].resultData.body;
        const productConf = input.body?.productConfiguration ?? {};
        input.productDescription = body.mainInsuranceConditions.insuranceProduct.productDescription;
        input.ruleDescription = body.insuranceRules.ruleDescription;

        const coolOffPeriodDays = productConf.coolOffPeriodDays;
        const coolOffPeriodDaysTextGenitive = getCaseStringFromNumber(coolOffPeriodDays, 'genitive');
        input.coolOffPeriod = `${coolOffPeriodDays || ''} (${coolOffPeriodDaysTextGenitive})`;
    }

};
