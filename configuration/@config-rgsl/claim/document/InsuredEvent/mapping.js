'use strict';

module.exports = function mapping(input) {

    const commonBody = {};

    commonBody.attributes = {
        contract: input.contract,
        eventDateInfo: input.eventDateInfo,
        insuredEventType: input.insuredEventType,
        insuredEventReason: input.insuredEventReason,
        diagnosis: input.diagnosis,
        diagnosisNote: input.diagnosisNote,
        fixedExchangeRate: input.fixedExchangeRate,
        useFixedExchangeRate: input.useFixedExchangeRate
    };

    return commonBody;
};
