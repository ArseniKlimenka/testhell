'use strict';

module.exports = function getPremiumPeriodTypeString(input) {

    const products = input.refData?.values ?? [];

    if (products.length > 0) {

        const productsNames = products.map(product => product.description);
        return productsNames.join(', ');
    }
};
