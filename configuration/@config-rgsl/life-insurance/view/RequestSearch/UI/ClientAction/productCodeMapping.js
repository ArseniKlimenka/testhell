'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function productCodeMapping(input, ambientProperties) {

    const contractProductCode = getValue(input, 'data.resultData.contractProductCode');
    const productsArray = getValue(input, 'context.productsArray');

    if (!contractProductCode || !productsArray) { return ' '; }

    return productsArray.find(item => item.productCode == contractProductCode)?.productDescription;

};
