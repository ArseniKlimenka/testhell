'use strict';

const { getProductConfigurationForEconomics, getProductConfigurationNotifications, productConfigurationOnChangeClean } = require('@config-rgsl/life-insurance/lib/economicParametersHelper');

module.exports = async function policyIssueDateEndOnChange(input, ambientProperties) {

    const productConfigurations = await getProductConfigurationForEconomics(input, ambientProperties, this);
    await getProductConfigurationNotifications(input, ambientProperties, this, productConfigurations);
    await productConfigurationOnChangeClean(input, ambientProperties, this);

    this.rebindComponent();
};
