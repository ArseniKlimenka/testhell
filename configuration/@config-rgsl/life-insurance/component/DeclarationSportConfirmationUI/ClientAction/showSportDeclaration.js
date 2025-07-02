'use strict';

const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function showSportDeclaration(input) {
    const productsWithSportDeclaration = [product.TERMVVTB];
    const productCode = input.componentContext.productConfiguration?.productCode;

    return productsWithSportDeclaration.includes(productCode);
};
