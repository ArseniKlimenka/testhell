'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { claimStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function isBeneficiariesAddButtonVisible(input) {

    const stateCode = input.context.State?.Code;

    if (!isSaveOperationAvailable(this.view)) {

        return false;
    }
    else if (stateCode === claimStates.sentToPayment || stateCode === claimStates.partiallyPaid) {

        return true;
    }


    return true;

};
