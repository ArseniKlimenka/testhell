'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { claimStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function isBeneficiariesRowActionAllowed(input) {

    const stateCode = input.context.State?.Code;

    if (!isSaveOperationAvailable(this.view)) {

        return {
            delete: false,
            edit: false
        };
    }
    else if (stateCode === claimStates.sentToPayment || stateCode === claimStates.partiallyPaid) {

        return {
            delete: true,
            edit: true
        };
    }


    return {
        delete: true,
        edit: true
    };

};
