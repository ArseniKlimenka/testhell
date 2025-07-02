'use strict';

const { LocalDateTime } = require('@js-joda/core');

function sinkErrorWriter(errorLineInput, that, additionalParameters) {

    const { businessErrors, exceptionType, input, message, sink, stackTrace, dataSource } = errorLineInput;

    const recordsStatus = [];

    const mappingResult = sink?.mappingResult;
    const transition = mappingResult?.transition;
    const transitionName = transition?.transitionName ?? input?.transitionName;
    const configurationName = transition?.configurationName ?? input?.configurationName;
    const configurationVersion = transition?.configurationVersion ?? input?.configurationVersion;
    const entityType = input?.entityType;
    const eventType = input?.eventType;
    const state = input?.state;
    const previousNumber = input?.previousNumber;
    const sequenceNumber = input?.sequenceNumber;
    const triggeredByUsername = input?.triggeredByUsername;
    const dimensionAmendmentType = input?.dimensions?.amendmentType;
    const dimensionContractType = input?.dimensions?.contractType;
    const dimensionProductGroup = input?.dimensions?.productGroup;
    const originalDocumentNumber = input?.originalDocument?.number;

    let number = mappingResult?.businessNumber ?? input?.number;

    if (!number) {
        number = errorLineInput.input.contractNumber;
    }

    const stackTraceLength = 1024;
    const stackTraceToDB = stackTrace?.substring(0, stackTraceLength);

    let businessErrorsMsg;
    if (businessErrors?.length > 0) {
        businessErrorsMsg = errorLineInput.businessErrors.map(i => `Код ошибки: ${i.code}, ошибка: ${i.message}`).join('; ');
    }

    const relatedUniDocNumber = input?.body?.amendmentData?.nonFinChangeAmendmentData?.technicalData?.requestData?.number;
    const relatedUniDocTransition = input?.body?.amendmentData?.nonFinChangeAmendmentData?.technicalData?.requestData?.transition;
    const relatedUniDocConf = additionalParameters?.relatedUniDocConf;

    const relatedUniVersDocNumber = input.productConfNumber;
    const relatedUniVersDocTransition = undefined;
    const relatedUniVersDocConf = additionalParameters?.relatedUniVersDocConf;

    const relatedUniMasterEntityCode = input.universalMasterEntityCode;
    const relatedUniMasterEntityConf = additionalParameters?.relatedUniMasterEntityConf;

    const errorInformation = {
        DOCUMENT_NUMBER: number,
        ORIGINAL_DOCUMENT_NUMBER: originalDocumentNumber,
        PREVIOUS_NUMBER: previousNumber,
        SEQUENCE_NUMBER: sequenceNumber,
        EXCEPTION_TYPE: exceptionType,
        TRANSITION_NAME: transitionName,
        CONF_NAME: configurationName,
        CONF_VERSION: configurationVersion,
        ENTITY_TYPE: entityType,
        EVENT_TYPE: eventType,
        STATE: state,
        RELATED_UNI_DOC_NUMBER: relatedUniDocNumber,
        RELATED_UNI_DOC_TRANSITION: relatedUniDocTransition,
        RELATED_UNI_DOC_CONF: relatedUniDocConf,
        RELATED_UNI_VERS_DOC_NUMBER: relatedUniVersDocNumber,
        RELATED_UNI_VERS_DOC_TRANSITION: relatedUniVersDocTransition,
        RELATED_UNI_VERS_DOC_CONF: relatedUniVersDocConf,
        RELATED_UNI_ME_CODE: relatedUniMasterEntityCode,
        RELATED_UNI_ME_CONF: relatedUniMasterEntityConf,
        SINK_NAME: sink?.name,
        VALIDATION_RESULT: sink?.validationResult,
        ERROR_TYPE: undefined,
        ERROR_CAUSE: sink?.cause,
        ERROR_MESSAGE: message,
        BUSINESS_ERRORS: businessErrorsMsg,
        IMPORT_DOCUMENT_ID: undefined,
        SOURCE_ID: undefined,
        RECORD_KEY: undefined,
        RESULT_SUMMARY: undefined,
        STACK_TRACE: stackTraceToDB,
        DIM_AMENDMENT_TYPE: dimensionAmendmentType,
        DIM_CONTRACT_TYPE: dimensionContractType,
        DIM_PRODUCT_GROUP: dimensionProductGroup,
        TRIGGERED_BY_USERNAME: triggeredByUsername,
        START_BY_USERNAME: that?.applicationContext?.originatingUser?.username,
        ERROR_DATE: LocalDateTime.now().toString(),
        STATUS: 0
    };

    if (dataSource) {

        const { cause, rawData } = dataSource;

        errorInformation.ERROR_TYPE = 'DataSourceError';
        errorInformation.ERROR_CAUSE = cause;

        errorInformation.IMPORT_DOCUMENT_ID = rawData.IMPORT_DOCUMENT_ID;
        errorInformation.SOURCE_ID = rawData.SOURCE_ID;
        errorInformation.RECORD_KEY = rawData.RECORD_KEY;

        recordsStatus.push(errorInformation);

    } else if (sink) {

        errorInformation.ERROR_TYPE = 'SinkError';

        if (input?.resultData) {

            input.resultData.forEach(data => {

                errorInformation.IMPORT_DOCUMENT_ID = data.importDocumentId;
                errorInformation.SOURCE_ID = data.sourceId;
                errorInformation.RECORD_KEY = data.recordKey;

                recordsStatus.push(errorInformation);
            });

        } else {

            errorInformation.IMPORT_DOCUMENT_ID = input?.importDocumentId;
            errorInformation.SOURCE_ID = input?.sourceId;
            errorInformation.RECORD_KEY = input?.recordKey;

            errorInformation.RESULT_SUMMARY = errorLineInput?.data;

            recordsStatus.push(errorInformation);
        }
    }

    return recordsStatus;
}

module.exports = {
    sinkErrorWriter
};
