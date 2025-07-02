'use strict';

module.exports = function productNameMapping(input, ambientProperties) {

    const productCode = input.data?.resultData?.productCode;
    const productsArray = input.context?.productsArray ?? [];

    if (!productCode || productsArray.length === 0) {

        return ' ';
    }

    return productsArray.find(item => item.productCode == productCode)?.productDescription ?? ' ';
};
