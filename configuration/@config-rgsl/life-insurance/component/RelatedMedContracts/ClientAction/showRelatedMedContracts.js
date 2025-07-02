'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function showRelatedMedContracts(input, ambientProperties) {

    const currentProductCode = getValue(input, 'context.Body.mainInsuranceConditions.insuranceProduct.productCode');

    if ([product.CAPCLRELOAS,
        product.CAPCLRELBOXOAS,
        product.CAPCLCHILDOAS,
        product.CAPCLCHILDBOXOAS].includes(currentProductCode)) {

        return true;
    }

    return false;

};
