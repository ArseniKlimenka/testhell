'use strict';

const { insurentEventTypesWithDiagnosis } = require('@config-rgsl/claim-base/lib/claimConsts');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

/**
 * @errorCode {errorCode} ContractIsRequired
 * @errorCode {errorCode} EventDateIsRequired
 * @errorCode {errorCode} InsuredEventTypeIsRequired
 * @errorCode {errorCode} InsuredEventReasonIsRequired
 * @errorCode {errorCode} DiagnosisIsRequired
 * @errorCode {errorCode} insuredEventDateOutOfRange
 * @errorCode {errorCode} InsuredEventDateSholdBeLesserOrEqualToToday
 * @errorCode {errorCode} DiagnosisNoteIsRequired
 * */
module.exports = function rootLevelValidation(input) {

    const validationErrors = [];

    const contractNumber = input.contract?.number;
    const externalContractNumber = input.contract?.externalNumber;

    if (!contractNumber && !externalContractNumber) {

        validationErrors.push({
            errorCode: 'ContractIsRequired',
            errorDataPath: '/Body/contract/number'
        });
    }

    const eventDate = input.eventDateInfo?.eventDate;

    if (!eventDate) {

        validationErrors.push({
            errorCode: 'EventDateIsRequired',
            errorDataPath: '/Body/eventDateInfo/eventDate'
        });
    }

    const dateNow = dateUtils.dateNow();

    if (eventDate > dateNow) {

        validationErrors.push({
            errorCode: 'InsuredEventDateSholdBeLesserOrEqualToToday',
            errorDataPath: '/Body/eventDateInfo/eventDate'
        });
    }

    const insuredEventType = input.insuredEventType?.code;

    if (!insuredEventType) {

        validationErrors.push({
            errorCode: 'InsuredEventTypeIsRequired',
            errorDataPath: '/Body/insuredEventType/code'
        });
    }

    const insuredEventReason = input.insuredEventReason?.code;

    if (!insuredEventReason) {

        validationErrors.push({
            errorCode: 'InsuredEventReasonIsRequired',
            errorDataPath: '/Body/insuredEventReason/code'
        });
    }

    const diagnosis = input.diagnosisNote;

    if (!diagnosis && insurentEventTypesWithDiagnosis.includes(insuredEventType)) {

        validationErrors.push({
            errorCode: 'DiagnosisNoteIsRequired',
            errorDataPath: '/Body/diagnosisNote'
        });
    }

    const insuredEventDate = input.eventDateInfo?.eventDate;
    const policyStartDate = input.tempTechnicalData?.policyStartDate;
    const policyEndDate = input.tempTechnicalData?.policyEndDate;

    if (insuredEventDate && policyStartDate && policyEndDate &&
        (insuredEventDate < policyStartDate || insuredEventDate > policyEndDate)) {

        validationErrors.push({
            errorCode: 'insuredEventDateOutOfRange',
            severity: 'Warning',
            errorDataPath: '/Body/eventDateInfo/eventDate'
        });
    }

    return validationErrors;
};
