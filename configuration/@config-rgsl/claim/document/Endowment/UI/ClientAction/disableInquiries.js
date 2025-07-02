'use strict';
const { endowmentStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function disableInquiries(input, ambientProperties) {

    const state = input.rootContext.State.Code;
    const currentActor = input.rootContext.WorkUnitActor?.CurrentActor;

    return currentActor !== 'Operations' ||
        (state !== endowmentStates.operationsApproval &&
        state !== endowmentStates.awaitingApproval &&
        state !== endowmentStates.awaitingInquiries &&
        state !== endowmentStates.awaitingEndowmentDate);
};
