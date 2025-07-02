'use strict';

module.exports = function getProductsString(input) {

    const products = input.refData ?? [];

    if (products.length > 0) {

        const productsNames = products.map(product => `${product.productDescription} (${product.productCode})`);
        return productsNames.join(', ');
    }
};
