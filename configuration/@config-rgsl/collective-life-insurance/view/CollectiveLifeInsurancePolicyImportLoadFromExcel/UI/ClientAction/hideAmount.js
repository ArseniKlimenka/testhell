'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { boxedProducts } = require('@config-rgsl/collective-life-insurance/lib/CollectivePolicyConsts');

module.exports = function hideAmount(input, ambientProperties) {

    const productCode = getValue(input, 'rootContext.Body.productCode');

    return boxedProducts.includes(productCode);
};
