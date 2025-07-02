'use strict';

const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function showCreateMedQuoteGenCheckUpTalents(input, ambientProperties) {

    const currentProductCode = input?.context?.Body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    if ([product.CAPCLCHILDOAS, product.CAPCLCHILDBOXOAS].includes(currentProductCode) || ([product.GENCHKSPORT].includes(currentProductCode))) {
        return true;
    }

    return false;

};
