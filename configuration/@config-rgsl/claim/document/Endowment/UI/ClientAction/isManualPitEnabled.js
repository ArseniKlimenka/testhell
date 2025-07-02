'use strict';

const { endowmentPaymentLineType, endowmentStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function isManualPitEnabled(input, ambientProperties) {

    const stateCode = input.rootContext?.State?.Code;
    const currentActor = ambientProperties.currentWorkUnitActor;
    const paymentLines = input.rootContext.Body.endowmentAmounts.paymentLines ?? [];
    const pitLine = paymentLines.find(item => item.lineType === endowmentPaymentLineType.PIT);
    return !!pitLine && (stateCode !== endowmentStates.awaitingInquiries || currentActor === 'Accounting');
};
