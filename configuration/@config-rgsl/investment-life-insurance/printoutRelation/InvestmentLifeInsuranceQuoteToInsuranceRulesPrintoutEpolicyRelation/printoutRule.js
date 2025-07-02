'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function rule(input) {

    const productCode = input.body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const products = lifeInsuranceConstants.product;
    const isPaper = input.body?.issueForm?.code?.issueFormCode == lifeInsuranceConstants.issueForm.paper.issueFormCode;

    // Don't remove, needed to send email ->
    const actor = this.applicationContext.actor;
    const isSystemActor = actor == lifeInsuranceConstants.actor.System;
    if (isSystemActor) {
        return true;
    }
    // <- Don't remove, needed to send email

    if ([products.IDG2ZENIT, products.IDG3ZENIT, products.IDG1ZENIT, products.IDG5ZENIT].includes(productCode) || !isPaper) {
        return true;
    }

};
