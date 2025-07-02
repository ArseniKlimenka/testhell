'use strict';

const { rateOfReturnSetOptions, rateOfReturnCleanSelected } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');

module.exports = async function onChangeCurrency(input, ambientProperties) {

    const body = input.context.Body;

    rateOfReturnCleanSelected(body, this, ambientProperties);
    await rateOfReturnSetOptions(body, this, ambientProperties);

    this.view.validate();
    this.view.reevaluateRules();
    this.view.rebind();
};
