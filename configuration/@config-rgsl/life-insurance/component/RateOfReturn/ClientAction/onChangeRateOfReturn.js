'use strict';

const { rateOfReturnSetData } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');

module.exports = function onChangeRateOfReturn(input, ambientProperties) {

    const body = input.context.Body;

    rateOfReturnSetData(body, this, ambientProperties);

    this.view.setDirty();
};
