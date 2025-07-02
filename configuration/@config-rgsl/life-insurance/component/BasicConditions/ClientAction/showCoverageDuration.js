'use strict';

const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function showCoverageDuration(input, ambientProperties) {

    const productCode = input?.additionalContext?.productCode;

    return productCode === product.ACCIDPC2;

};
