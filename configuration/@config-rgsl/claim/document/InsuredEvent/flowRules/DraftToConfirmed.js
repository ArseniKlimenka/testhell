'use strict';

const { operationsOnlyTypes, claimActors } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function rule(input) {

    const actor = this.applicationContext.actor;
    const currentEventType = input.body.insuredEventType?.code;

    if (currentEventType && (actor === claimActors.operations && !operationsOnlyTypes.includes(currentEventType)) ||
        (actor === claimActors.claimManager && operationsOnlyTypes.includes(currentEventType))) {

        return false;
    }

    return true;
};
