'use strict';

const { endowmentStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function isBeneficiaryBankAccountEnabled(input, ambientProperties) {

    const stateCode = input.rootContext?.State?.Code;
    const currentActor = ambientProperties.currentWorkUnitActor;
    return stateCode !== endowmentStates.awaitingInquiries && currentActor !== 'Accounting';
};
