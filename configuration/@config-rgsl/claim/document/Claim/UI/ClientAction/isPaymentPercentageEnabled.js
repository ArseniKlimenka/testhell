'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { claimStates, injuryRisks } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function isPaymentPercentageEnabled(input) {

    const stateCode = input.context.State?.Code;

    if (!isSaveOperationAvailable(this.view) ||
        stateCode === claimStates.legalApproval ||
        stateCode === claimStates.securityApproval ||
        stateCode === claimStates.sentToPayment ||
        stateCode === claimStates.partiallyPaid) {

        return false;
    }

    const risk = input.context.Body.mainAttributes?.selectedRisk;

    if (risk && injuryRisks.includes(risk.riskCode)) {

        return false;
    }

    return true;
};
