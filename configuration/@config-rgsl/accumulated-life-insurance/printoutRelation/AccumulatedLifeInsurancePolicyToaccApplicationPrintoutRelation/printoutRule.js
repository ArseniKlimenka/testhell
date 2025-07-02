'use strict';
const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function rule(input) {

    // Don't remove, needed to send email ->
    const actor = this.applicationContext.actor;
    const isSystemActor = actor == lifeInsuranceConstants.actor.System;

    if (isSystemActor) {

        return {};
    }
    // <- Don't remove, needed to send email

    const productCode = input.body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const isReinvest = lifeInsuranceConstants.productGroupArray.REINVEST.includes(productCode);
    const issueFormCode = input.body.issueForm?.code?.issueFormCode ?? '';
    const isEPolicy = issueFormCode == 'ePolicy';

    if (productCode != product.NOTE3BFKO || !isReinvest || (isReinvest && isEPolicy)) {

        return;
    }

    const issueDate = input.body.basicConditions?.issueDate;

    if (!productCode || !issueDate) {

        return;
    }

    const productConf = input.body?.productConfiguration ?? {};

    if (productConf.applicationPrintout == 'accApplicationPrintout') {

        return {};
    }
};
