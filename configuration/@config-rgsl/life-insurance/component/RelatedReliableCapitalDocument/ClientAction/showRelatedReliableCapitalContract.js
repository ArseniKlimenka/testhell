'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function showRelatedReliableCapitalContract(input, ambientProperties) {

    const currentProductCode = getValue(input, 'context.Body.mainInsuranceConditions.insuranceProduct.productCode');

    if (productGroupArray.GENCHK.includes(currentProductCode)) {

        return true;
    }

    return false;

};
