'use strict';

const { claimStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function canSelectRejectionReason(input) {

    const statesToShowRejectionReason = [claimStates.claimManagerApproval];
    const stateCode = input.context.State?.Code ?? 'None';
    return stateCode && statesToShowRejectionReason.includes(stateCode);
};
