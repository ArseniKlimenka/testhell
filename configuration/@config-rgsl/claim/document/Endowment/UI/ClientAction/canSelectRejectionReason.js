'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { endowmentStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function canSelectRejectionReason(input) {

    if (!isSaveOperationAvailable(this.view)) {

        return false;
    }

    const stateCode = input.context.State?.Code;

    return stateCode === endowmentStates.operationsApproval ||
        stateCode === endowmentStates.operationsDirectorApproval ||
        stateCode === endowmentStates.deputyDirectorAproval;
};
