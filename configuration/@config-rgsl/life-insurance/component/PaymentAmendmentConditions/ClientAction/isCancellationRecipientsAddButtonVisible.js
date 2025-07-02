'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function isCancellationRecipientsAddButtonVisible(input) {

    const stateCode = getValue(input, 'context.State.Code');

    if (!isSaveOperationAvailable(this.view) || stateCode === amendmentConstants.cancellationAmendmentState.RequestToClient) {

        return false;
    }
    else if (stateCode === amendmentConstants.cancellationAmendmentState.SentToPayment) {

        return true;
    }


    return true;

};
