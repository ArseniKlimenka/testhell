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

    const body = input?.body;
    const uwTriggers = body?.uwTriggers;
    const mainInsuranceConditions = body?.mainInsuranceConditions;

    const productCode = mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = body?.basicConditions?.issueDate;
    const isShowInvAppGroup = lifeInsuranceConstants.productGroupArray.SHOW_INV_APP_QUOTE.includes(productCode);

    const schemaValidations = input?.commonBody?.validations?.schemaValidations ?? [];
    if (!isShowInvAppGroup && !schemaValidations?.some(item => item.code == "existsTrigger")) {
        return;
    }

    if (!productCode || !issueDate) {

        return;
    }

    const productConf = input.body?.productConfiguration ?? {};
    const hasOnlyUkspTrigger = uwTriggers.every(element => element.departament == 'UKSP');
    if (hasOnlyUkspTrigger && uwTriggers.length >= 1) {
        return;
    }

    if (productConf.applicationPrintout == 'invApplicationPrintout') {

        return true;
    }
};
