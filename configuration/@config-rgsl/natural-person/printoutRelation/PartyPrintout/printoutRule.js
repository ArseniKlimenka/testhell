'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function rule(input) {

    // Don't remove, needed to send email ->
    const actor = this.applicationContext.actor;
    const isSystemActor = actor == lifeInsuranceConstants.actor.System;

    if (isSystemActor) {

        return {};
    }
    // <- Don't remove, needed to send email

    const originatingUser = this.applicationContext?.originatingUser;
    const userGroups = originatingUser?.userGroups;
    const isComplianceGroup = userGroups.some(x => x.code === lifeInsuranceConstants.userGroup.compliance);

    if (!isComplianceGroup) {
        return;
    }

    return true;
};
