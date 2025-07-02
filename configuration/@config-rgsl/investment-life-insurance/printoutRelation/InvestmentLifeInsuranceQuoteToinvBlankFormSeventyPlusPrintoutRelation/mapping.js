'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input) {

    const { policy } = printoutsHelper.getPollicyInfo(input, this);
    const productCode = input.body.mainInsuranceConditions.insuranceProduct.productCode;
    const isBasisActive2VTB = lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_20.includes(productCode);

    return {
        policy,
        isBasisActive2VTB
    };

};
