'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { endowmentStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function isBeneficiariesAddButtonVisible(input) {

    const stateCode = input.context.State?.Code;

    if (stateCode === endowmentStates.sentToPayment && isSaveOperationAvailable(this.view)) {

        return true;
    }
    else if (!isSaveOperationAvailable(this.view) || this.view.areAllElementsDisabled()) {

        return false;
    }


    return true;

};
