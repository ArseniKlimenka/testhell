'use strict';

const { risksCodes, claimStates } = require('@config-rgsl/claim-base/lib/claimConsts');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function numberOfNonAcceptancePaymentEnabled(input) {

    if (!isSaveOperationAvailable(this.view)) {

        return false;
    }

    const nonAcceptance = input.context.Body.claimAmounts?.nonAcceptance ?? false;

    return nonAcceptance;
};
