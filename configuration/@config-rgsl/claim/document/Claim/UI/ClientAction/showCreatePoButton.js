'use strict';

const { claimStates } = require('@config-rgsl/claim-base/lib/claimConsts');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function showCreatePoButton(input) {

    const statesToShowButton = [claimStates.sentToPayment, claimStates.partiallyPaid];
    const stateCode = input.context.State?.Code;
    return stateCode && statesToShowButton.includes(stateCode) && isSaveOperationAvailable(this.view);
};
