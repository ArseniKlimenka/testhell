'use strict';

const { claimStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function canEnterRejectionNote(input) {

    const statesToShowRejectionReason = [claimStates.claimManagerApproval];
    const stateCode = input.context.State?.Code ?? 'None';
    return statesToShowRejectionReason.includes(stateCode);
};
