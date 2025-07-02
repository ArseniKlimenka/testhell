'use strict';

const { rateOfReturnSetOptions, rateOfReturnSetData, rateOfReturnCleanSelected, rateOfReturnNotification } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');

module.exports = async function onChangeVariant(input, ambientProperties) {

    const body = input.context.Body;
    const currentVariant = input.data?.variant;

    rateOfReturnCleanSelected(body, this, ambientProperties, currentVariant);
    await rateOfReturnSetOptions(body, this, ambientProperties);
    rateOfReturnSetData(body, this, ambientProperties);
    rateOfReturnNotification(body, this, ambientProperties);

    this.view.setDirty();
    this.view.rebind();
};
