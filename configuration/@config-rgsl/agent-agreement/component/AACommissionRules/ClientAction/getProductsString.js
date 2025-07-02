'use strict';

module.exports = function getProductsString(input) {

    const products = input.refData?.values ?? [];

    if (products && products.length > 0) {

        const productsNames = products.map(product => `${product.description} (${product.code})`);
        return productsNames.join(', ');
    }
};
