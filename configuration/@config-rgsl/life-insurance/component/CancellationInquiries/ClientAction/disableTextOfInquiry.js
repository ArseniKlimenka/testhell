'use strict';

const { cancellationAmendmentState } = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function disableTextOfInquiry(input) {

    const state = input.rootContext.State.Code;
    const currentActor = input.rootContext.WorkUnitActor?.CurrentActor;

    return currentActor !== 'Operations' ||
        state === cancellationAmendmentState.Active ||
        state === cancellationAmendmentState.SentToPayment ||
        state === cancellationAmendmentState.Paid ||
        state === cancellationAmendmentState.Cancelled;
};
