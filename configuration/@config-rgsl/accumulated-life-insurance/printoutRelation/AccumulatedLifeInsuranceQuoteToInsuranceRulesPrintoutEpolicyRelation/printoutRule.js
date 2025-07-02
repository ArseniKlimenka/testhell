'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function rule(input) {

    const productCode = input.body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const products = lifeInsuranceConstants.product;

    // Don't remove, needed to send email ->
    const actor = this.applicationContext.actor;
    const isSystemActor = actor == lifeInsuranceConstants.actor.System;
    if (isSystemActor) {
        return true;
    }
    // <- Don't remove, needed to send email

    if (lifeInsuranceConstants.productGroupArray.ACC_SHOW_PRINT_INSURANCE_RULES.includes(productCode)) {
        return true;
    }

};
