'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { endowmentStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function isBeneficiariesRowActionAllowed(input, ambientProperties) {

    const stateCode = input.context.State?.Code;
    const currentActor = ambientProperties.currentWorkUnitActor;
    const isAvailableForAccounting = isSaveOperationAvailable(this.view) && currentActor === 'Accounting';

    if (stateCode === endowmentStates.sentToPayment && isSaveOperationAvailable(this.view)) {

        return true;
    }
    else if ((stateCode === endowmentStates.awaitingInquiries && isSaveOperationAvailable(this.view)) || isAvailableForAccounting) {

        return {
            delete: false,
            edit: true
        };
    }
    else if (!isSaveOperationAvailable(this.view) || this.view.areAllElementsDisabled()) {

        return {
            delete: false,
            edit: false
        };
    }


    return {
        delete: true,
        edit: true
    };

};
