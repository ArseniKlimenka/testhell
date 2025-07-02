'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { getProductConfigurationForEconomics, getProductConfigurationNotifications, productConfigurationOnChangeClean } = require('@config-rgsl/life-insurance/lib/economicParametersHelper');

module.exports = async function policyIssueDateStartOnChange(input, ambientProperties) {

    if (DateTimeUtils.isAfter(input.data.policyIssueDateStart, input.data.policyIssueDateEnd)) {
        input.data.policyIssueDateEnd = undefined;
    }

    const productConfigurations = await getProductConfigurationForEconomics(input, ambientProperties, this);
    await getProductConfigurationNotifications(input, ambientProperties, this, productConfigurations);
    await productConfigurationOnChangeClean(input, ambientProperties, this);

    this.rebindComponent();
};
