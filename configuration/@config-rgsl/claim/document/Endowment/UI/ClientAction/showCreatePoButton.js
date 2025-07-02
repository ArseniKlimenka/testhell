'use strict';

const { endowmentStates } = require('@config-rgsl/claim-base/lib/claimConsts');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function showCreatePoButton(input) {

    const stateCode = input.context?.State?.Code;
    return (stateCode === endowmentStates.sentToPayment || stateCode === endowmentStates.partiallyPaid) && isSaveOperationAvailable(this.view);
};
