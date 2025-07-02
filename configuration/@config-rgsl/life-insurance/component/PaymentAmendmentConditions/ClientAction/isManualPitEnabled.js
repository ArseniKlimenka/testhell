'use strict';

const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function isManualPitEnabled(input, ambientProperties) {

    const paymentLines = input.componentContext.paymentLines ?? [];
    const pitLine = paymentLines.find(item => item.paymentLineType === amendmentConstants.amendmentPaymentLineType.pit);
    const stateCode = input.rootContext?.State?.Code;
    const currentActor = ambientProperties.currentWorkUnitActor;
    return !!pitLine && (stateCode !== amendmentConstants.cancellationAmendmentState.RequestToClient || currentActor === 'Accounting');
};
