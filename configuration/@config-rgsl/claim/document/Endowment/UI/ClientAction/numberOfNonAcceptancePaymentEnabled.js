'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function numberOfNonAcceptancePaymentEnabled(input) {

    if (!isSaveOperationAvailable(this.view)) {

        return false;
    }

    const nonAcceptance = input.context.Body.endowmentAmounts.nonAcceptance ?? false;
    return nonAcceptance;
};
