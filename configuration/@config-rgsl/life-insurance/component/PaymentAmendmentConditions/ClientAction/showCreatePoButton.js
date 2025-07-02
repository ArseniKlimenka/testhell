'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function showCreatePoButton(input) {

    const stateCode = getValue(input, 'context.State.Code');
    return stateCode === amendmentConstants.cancellationAmendmentState.SentToPayment && isSaveOperationAvailable(this.view);
};
