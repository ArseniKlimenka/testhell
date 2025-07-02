'use strict';

const { resetGiftServices } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestHelper');
const { rateOfReturnCleanSelected, rateOfReturnSetOptions } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');

module.exports = async function onChangeRiskPremium(input, ambientProperties) {

    const body = input.context.Body;

    resetGiftServices(input);
    rateOfReturnCleanSelected(body, this, ambientProperties);
    await rateOfReturnSetOptions(body, this, ambientProperties);

    this.view.validate();
    this.view.reevaluateRules();
    this.view.rebind();
};
