'use strict';

const { endowmentStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function isCalculateFromAmountEnabled(input, ambientProperties) {

    const paymentLinesManualCorrection = input.rootContext.Body.endowmentAmounts?.paymentLinesManualCorrection ?? false;
    const stateCode = input.rootContext?.State?.Code;
    const currentActor = ambientProperties.currentWorkUnitActor;
    return !!paymentLinesManualCorrection && stateCode !== endowmentStates.awaitingInquiries && currentActor !== 'Accounting';
};
