'use strict';

const { endowmentStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function isBeneficiaryLookupEnabled(input, ambientProperties) {

    const reason = input.rowContext.beneficiaryReason?.code;
    const stateCode = input.rootContext?.State?.Code;
    const currentActor = ambientProperties.currentWorkUnitActor;

    return !!reason && stateCode !== endowmentStates.awaitingInquiries && currentActor !== 'Accounting';
};
