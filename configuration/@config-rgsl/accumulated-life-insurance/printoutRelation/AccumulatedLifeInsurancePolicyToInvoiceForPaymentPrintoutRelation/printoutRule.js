'use strict';

const { showByProductMemoPrintout } = require('@config-rgsl/life-insurance/lib/printoutsHelper');
const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function rule(input) {

    const products = [product.WCENOAS, product.WCEN3OAS];
    return showByProductMemoPrintout(input, this, products);
};
