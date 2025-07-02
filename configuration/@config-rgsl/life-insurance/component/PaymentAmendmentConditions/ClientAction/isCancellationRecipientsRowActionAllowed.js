'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function isCancellationRecipientsRowActionAllowed(input, ambientProperties) {

    const stateCode = getValue(input, 'context.State.Code');
    const currentActor = ambientProperties.currentWorkUnitActor;
    const isAvailableForAccounting = isSaveOperationAvailable(this.view) && currentActor === 'Accounting';

    if (!isSaveOperationAvailable(this.view)) {

        return {
            delete: false,
            edit: false
        };
    }
    else if ((stateCode === amendmentConstants.cancellationAmendmentState.RequestToClient && isSaveOperationAvailable(this.view)) ||
        isAvailableForAccounting) {

        return {
            delete: false,
            edit: true
        };
    }
    else if (stateCode === amendmentConstants.cancellationAmendmentState.SentToPayment) {

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
