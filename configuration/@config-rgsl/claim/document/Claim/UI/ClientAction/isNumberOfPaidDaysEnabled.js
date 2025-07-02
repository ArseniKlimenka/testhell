'use strict';

const { claimStates, risksWithPaidDays } = require('@config-rgsl/claim-base/lib/claimConsts');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function isNumberOfPaidDaysEnabled(input) {

    const stateCode = input.context.State?.Code;

    if (!isSaveOperationAvailable(this.view) ||
        stateCode === claimStates.legalApproval ||
        stateCode === claimStates.securityApproval ||
        stateCode === claimStates.sentToPayment ||
        stateCode === claimStates.partiallyPaid) {

        return false;
    }

    const risk = input.context.Body.mainAttributes?.selectedRisk;

    if (risk && risksWithPaidDays.includes(risk.riskCode)) {

        return true;
    }

    return false;
};
