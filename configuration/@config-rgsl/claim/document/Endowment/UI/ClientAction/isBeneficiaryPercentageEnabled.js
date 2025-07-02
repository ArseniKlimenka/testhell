'use strict';

const { endowmentStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function isBeneficiaryPercentageEnabled(input, ambientProperties) {

    const calculateFromAmount = input.rowContext.calculateFromAmount ?? false;
    const stateCode = input.rootContext?.State?.Code;
    const currentActor = ambientProperties.currentWorkUnitActor;
    return !calculateFromAmount && stateCode !== endowmentStates.awaitingInquiries && currentActor !== 'Accounting';
};
