'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { claimPaymentLineType } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function isPaymentLinesRowActionAllowed(input) {

    const isManualCorrectionEnabled = input.context.Body.claimAmounts.paymentLinesManualCorrection;

    if (!isSaveOperationAvailable(this.view)) {

        return {
            edit: false
        };
    }
    else if (isManualCorrectionEnabled && input.affectedRow.lineType !== claimPaymentLineType.invProfitSlp) {

        return {
            edit: true
        };
    }

    return {
        edit: false
    };
};
