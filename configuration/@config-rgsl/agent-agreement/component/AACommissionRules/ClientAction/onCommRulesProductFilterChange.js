'use strict';

module.exports = function onCommRulesProductFilterChange(input) {

    const filterString = input.filterObj.insuranceProduct;

    if (!filterString || filterString.length === 0) {

        return true;
    }

    const currentProducts = input.data?.insuranceProduct?.values ?? [];

    if (currentProducts.length === 0) {

        return false;
    }

    const productsString = currentProducts.map(product => `${product.description}(${product.code})`).join(' ').toUpperCase();

    if (productsString.indexOf(filterString.toUpperCase()) >= 0) {

        return true;
    }


    return false;

};
