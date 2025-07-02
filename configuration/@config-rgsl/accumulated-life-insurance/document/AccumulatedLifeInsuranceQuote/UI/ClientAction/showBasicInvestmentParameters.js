'use strict';

const { rateOfReturnIsCorrectProduct } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');

module.exports = function showBasicInvestmentParameters(input, ambientProperties) {

    const body = input.context?.Body;

    return rateOfReturnIsCorrectProduct(body);
};
