'use strict';

const { businessClock } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const output = {
        recordId: input.RECORD_ID,
        number: input.DOCUMENT_NUMBER,
        originalDocumentNumber: input.ORIGINAL_DOCUMENT_NUMBER,
        previousNumber: input.PREVIOUS_NUMBER,
        sequenceNumber: input.SEQUENCE_NUMBER,
        exceptionType: input.EXCEPTION_TYPE,
        transitionName: input.TRANSITION_NAME,
        confName: input.CONF_NAME,
        confVersion: input.CONF_VERSION,
        entityType: input.ENTITY_TYPE,
        eventType: input.EVENT_TYPE,
        state: input.STATE,
        relatedUniDocNumber: input.RELATED_UNI_DOC_NUMBER,
        relatedUniDocTransition: input.RELATED_UNI_DOC_TRANSITION,
        relatedUniDocConf: input.RELATED_UNI_DOC_CONF,
        relatedClaimNumber: input.RELATED_CLAIM_NUMBER,
        relatedClaimTransition: input.RELATED_CLAIM_TRANSITION,
        relatedClaimConf: input.RELATED_CLAIM_CONF,
        relatedUniVersDocNumber: input.RELATED_UNI_VERS_DOC_NUMBER,
        relatedUniVersDocTransition: input.RELATED_UNI_VERS_DOC_TRANSITION,
        relatedUniVersDocConf: input.RELATED_UNI_VERS_DOC_CONF,
        relatedUniMECode: input.RELATED_UNI_ME_CODE,
        relatedUniMEConf: input.RELATED_UNI_ME_CONF,
        sinkName: input.SINK_NAME,
        validationResult: input.VALIDATION_RESULT,
        errorType: input.ERROR_TYPE,
        errorCause: input.ERROR_CAUSE,
        errorMessage: input.ERROR_MESSAGE,
        businessErrors: input.BUSINESS_ERRORS,
        importDocumentId: input.IMPORT_DOCUMENT_ID,
        sourceId: input.SOURCE_ID,
        recordKey: input.RECORD_KEY,
        resultSummary: input.RESULT_SUMMARY,
        stackTrace: input.STACK_TRACE,
        dimAmendmentType: input.DIM_AMENDMENT_TYPE,
        dimContractType: input.DIM_CONTRACT_TYPE,
        dimProductGroup: input.DIM_PRODUCT_GROUP,
        triggeredByUserName: input.TRIGGERED_BY_USERNAME,
        startByUsername: input.START_BY_USERNAME,
        errorDate: businessClock.convertFromBusinessTimeToUTC(input.ERROR_DATE),
        status: input.STATUS,
    };

    return output;
};
