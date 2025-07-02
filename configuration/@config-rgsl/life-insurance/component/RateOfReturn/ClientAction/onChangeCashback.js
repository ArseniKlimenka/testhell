'use strict';

const { rateOfReturnSetOptions, rateOfReturnSetData } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');

module.exports = async function onChangeCashback(input, ambientProperties) {

    const body = input.context.Body;

    await rateOfReturnSetOptions(body, this, ambientProperties);
    rateOfReturnSetData(body, this, ambientProperties);

    this.view.save();
};
