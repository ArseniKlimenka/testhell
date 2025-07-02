'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    let result = undefined;

    if (input) {

        result = {
            documentNumber: input.number,
            contractNumber: input.body.contract.number || input.body.contract.externalNumber,
            insuredEventDate: input.body.eventDateInfo && input.body.eventDateInfo.eventDate ? DateTimeUtils.formatDate(input.body.eventDateInfo.eventDate) : undefined,
            documentState: translationUtils.getTranslation(`document/${input.metadata.configuration.name}/1`, 'states', null, input.stateCode),
            diagnosis: input.body.diagnosis,
            diagnosisNote: input.body.diagnosisNote,
            insuredEventType: input.body.insuredEventType,
            insuredEventReason: input.body.insuredEventReason
        };
    }

    return result;
};
