'use strict';

const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function isCalculateFromAmountEnabled(input, ambientProperties) {

    const paymentLinesManualCorrection = input.componentContext.paymentLinesManualCorrection ?? false;
    const stateCode = input.rootContext?.State?.Code;
    const currentActor = ambientProperties.currentWorkUnitActor;
    return !!paymentLinesManualCorrection && stateCode !== amendmentConstants.cancellationAmendmentState.RequestToClient && currentActor !== 'Accounting';
};
