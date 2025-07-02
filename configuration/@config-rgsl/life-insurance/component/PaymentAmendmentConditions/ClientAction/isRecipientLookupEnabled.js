'use strict';

const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function isRecipientLookupEnabled(input, ambientProperties) {

    const reason = input.rowContext?.recipientReason?.code;
    const stateCode = input.rootContext?.State?.Code;
    const currentActor = ambientProperties.currentWorkUnitActor;
    return !!reason && stateCode !== amendmentConstants.cancellationAmendmentState.RequestToClient && currentActor !== 'Accounting';
};
