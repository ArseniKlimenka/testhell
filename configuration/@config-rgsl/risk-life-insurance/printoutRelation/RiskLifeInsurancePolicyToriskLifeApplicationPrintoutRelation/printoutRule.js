'use strict';
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function rule(input) {

    // Don't remove, needed to send email ->
    const actor = this.applicationContext.actor;
    const isSystemActor = actor == lifeInsuranceConstants.actor.System;
    if (isSystemActor) {
        return true;
    }
    // <- Don't remove, needed to send email

    const productCode = input.body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.body.basicConditions?.issueDate;

    if (!productCode || !issueDate) {
        return;
    }

    const productConf = input.body?.productConfiguration ?? {};

    if (productConf.applicationPrintout == 'riskLifeApplicationPrintout') {

        return true;
    }
};
