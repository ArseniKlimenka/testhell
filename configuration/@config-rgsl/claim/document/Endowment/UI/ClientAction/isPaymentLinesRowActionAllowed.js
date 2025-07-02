'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { endowmentPaymentLineType } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function isPaymentLinesRowActionAllowed(input) {

    const isManualCorrectionEnabled = input.context.Body.endowmentAmounts.paymentLinesManualCorrection;

    if (!isSaveOperationAvailable(this.view)) {

        return {
            edit: false
        };
    }
    else if (isManualCorrectionEnabled &&
        input.affectedRow.lineType !== endowmentPaymentLineType.debt &&
        input.affectedRow.lineType !== endowmentPaymentLineType.PIT &&
        input.affectedRow.lineType !== endowmentPaymentLineType.investProfit &&
        input.affectedRow.lineType !== endowmentPaymentLineType.investProfitAnnual &&
        input.affectedRow.lineType !== endowmentPaymentLineType.investProfitCoupon) {

        return {
            edit: true
        };
    }

    return {
        edit: false
    };
};
