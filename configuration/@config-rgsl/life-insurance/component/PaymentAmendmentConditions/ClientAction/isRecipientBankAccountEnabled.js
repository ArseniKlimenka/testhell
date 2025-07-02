'use strict';

const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function isRecipientBankAccountEnabled(input, ambientProperties) {

    const stateCode = input.rootContext?.State?.Code;
    const currentActor = ambientProperties.currentWorkUnitActor;
    return stateCode !== amendmentConstants.cancellationAmendmentState.RequestToClient && currentActor !== 'Accounting';
};
