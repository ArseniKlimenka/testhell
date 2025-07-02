'use strict';

const { risksCodes, anyReasonDisabilityRisks, claimStates } = require('@config-rgsl/claim-base/lib/claimConsts');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function isDisabilityGroupEnabled(input) {

    const stateCode = input.context.State?.Code;

    if (!isSaveOperationAvailable(this.view) || stateCode === claimStates.legalApproval || stateCode === claimStates.securityApproval || stateCode === claimStates.sentToPayment || stateCode === claimStates.partiallyPaid) {

        return false;
    }

    const risk = input.context.Body.mainAttributes?.selectedRisk;

    if (risk && (risk.riskCode === risksCodes.disabilityByAccident || anyReasonDisabilityRisks.includes(risk.riskCode))) {

        return true;
    }

    return false;
};
