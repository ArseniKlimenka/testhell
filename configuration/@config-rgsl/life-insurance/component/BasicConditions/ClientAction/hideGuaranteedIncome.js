'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function hideGuaranteedIncome(input, ambientProperties) {

    const body = input.context.Body;

    const productCode = getValue(body, 'mainInsuranceConditions.insuranceProduct.productCode');
    if (!productCode)
    { return false; }

    const isHideGuaranteedIncome = productGroupArray.MO_DMS.includes(productCode);
    if (isHideGuaranteedIncome)
    { return true; }

    return false;

};
