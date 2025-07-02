'use strict';

const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function showCreateMedQuoteGenCheckUpHealth(input, ambientProperties) {

    const currentProductCode = input?.context?.Body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    if ([product.CAPCLRELOAS, product.CAPCLRELBOXOAS].includes(currentProductCode)) {
        return true;
    }

    return false;

};
