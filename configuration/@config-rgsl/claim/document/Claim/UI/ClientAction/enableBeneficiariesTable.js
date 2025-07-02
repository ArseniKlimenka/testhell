'use strict';

const { claimStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function enableBeneficiariesTable(input) {

    const stateCode = input.context.State?.Code;
    const contract = input.rootContext.Body.mainAttributes?.contract?.number;

    return !!contract && stateCode !== claimStates.legalApproval && stateCode !== claimStates.securityApproval;
};
