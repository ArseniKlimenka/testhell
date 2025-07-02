'use strict';

const { rateOfReturnIsCorrectProduct } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');

module.exports = function showRateOfReturn(input, ambientProperties) {

    const body = input.context?.Body;

    return rateOfReturnIsCorrectProduct(body);
};
