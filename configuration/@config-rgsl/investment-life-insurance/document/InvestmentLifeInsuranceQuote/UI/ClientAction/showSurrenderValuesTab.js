'use strict';

const constants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function showSurrenderValuesTab(input, ambientProperties) {

    const body = input.context?.Body;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    return !(productCode && constants.productGroupArray.OPTIMAL_CHOICE_VTB.includes(productCode));
};
