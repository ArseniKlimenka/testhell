'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input) {

    const { policy } = printoutsHelper.getPollicyInfo(input, this);
    const productCode = input.body.mainInsuranceConditions.insuranceProduct.productCode;
    const isEquitySeventyPlus = lifeInsuranceConstants.productGroupArray.EQUITY_SEVENTY_PLUS.includes(productCode);

    return {
        policy,
        isEquitySeventyPlus
    };

};
