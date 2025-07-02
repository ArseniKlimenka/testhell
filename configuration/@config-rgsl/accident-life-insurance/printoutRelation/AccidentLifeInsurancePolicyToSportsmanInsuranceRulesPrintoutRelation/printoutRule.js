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

    if (input?.body?.insuranceRules?.ruleCode == 'ACC_20241223') {

        return true;
    }

};
