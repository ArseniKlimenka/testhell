'use strict';

const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function isRecipientPercentageEnabled(input, ambientProperties) {

    const calculateFromAmount = input.rowContext?.calculateFromAmount ?? false;
    const stateCode = input.rootContext?.State?.Code;
    const currentActor = ambientProperties.currentWorkUnitActor;
    return !calculateFromAmount && stateCode !== amendmentConstants.cancellationAmendmentState.RequestToClient && currentActor !== 'Accounting';
};
