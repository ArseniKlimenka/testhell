'use strict';

const { injuryGroupName } = require('@config-rgsl/claim-base/lib/claimConsts');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { claimStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function isInjuriesTableEnabled(input) {

    const stateCode = input.context.State?.Code;

    if (!isSaveOperationAvailable(this.view) || stateCode === claimStates.sentToPayment || stateCode === claimStates.partiallyPaid) {

        return false;
    }

    const risk = input.context.Body.mainAttributes?.selectedRisk;

    if (risk && risk.risksGroup === injuryGroupName) {

        return true;
    }

    return false;
};
