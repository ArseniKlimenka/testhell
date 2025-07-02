'use strict';

const { endowmentStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function disableTextOfInquiry(input) {

    const state = input.rootContext.State.Code;
    const currentActor = input.rootContext.WorkUnitActor?.CurrentActor;

    const inquiryReasonOther = input.data?.inquiryReasons?.filter(i => i.description == 'Иное').length > 0;

    return currentActor !== 'Operations' ||
        state === endowmentStates.sentToPayment ||
        state === endowmentStates.paid ||
        state === endowmentStates.cancelled ||
        !inquiryReasonOther;
};
