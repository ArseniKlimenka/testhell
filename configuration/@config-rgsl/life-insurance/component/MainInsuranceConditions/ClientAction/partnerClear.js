'use strict';

const { handleOnChangeInsuranceProduct } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');

module.exports = async function partnerClear(input, ambientProperties) {

    input.context.Body.mainInsuranceConditions.partner = {};
    input.context.Body.mainInsuranceConditions.insuranceProduct = undefined;

    await handleOnChangeInsuranceProduct(input, ambientProperties, this);

    this.view.rebind();
    this.view.validate();
    this.view.reevaluateRules();
};
