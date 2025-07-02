const { translationUtils } = require('@adinsure/runtime');

module.exports = function mapping(errorLineInput, sinkExchange) {

    // called from route, but we need to provire RU translations
    this.applicationContext.locale = "ru-RU";

    const recordsStatus = [];

    // Input can be null if mainDataSource or data provider has failed with ResultMappingFunction or DataProvider cause
    const { input } = errorLineInput;
    let { message } = errorLineInput;
    message = message.replace("Javascript system error occurred: Message: ", "");

    if (sinkExchange.hasValidationErrors) {
        sinkExchange.validationErrors.forEach(data => {
            const errorMessageTranslated = translationUtils.getTranslation(`masterEntity/NaturalPerson/1`, 'rule', '', data.code);
            recordsStatus.push({
                ERRORS: {
                    errorType: 'SinkError',
                    errorCause: errorLineInput.sink.cause, // MappingFunction | Processing | ApplyFunction
                    errorMessage: data.message + (errorMessageTranslated ? (' (' + errorMessageTranslated + ')') : '')
                },
                IMPORT_DOCUMENT_ID: input.importDocumentId,
                SOURCE_ID: input.sourceId,
                RECORD_KEY: input.recordKey,
                STATUS: 0
            });
        });

    }
    else if (errorLineInput.dataSource) {
        const { cause, rawData } = errorLineInput.dataSource;

        recordsStatus.push({
            ERRORS: {
                errorType: 'DataSourceError',
                errorCause: cause, // MappingFunction | Processing | ApplyFunction
                errorMessage: message
            },
            IMPORT_DOCUMENT_ID: rawData.IMPORT_DOCUMENT_ID,
            SOURCE_ID: rawData.SOURCE_ID,
            RECORD_KEY: rawData.RECORD_KEY,
            STATUS: 0
        });
    } else if (errorLineInput.sink) {
        // mappingResult can be null if mapping has failed
        const { name, cause, mappingResult, validationResult } = errorLineInput.sink;

        if (input.resultData) {
            input.resultData.forEach(data => {
                recordsStatus.push({
                    ERRORS: {
                        errorType: 'SinkError',
                        errorCause: cause, // MappingFunction | Processing | ApplyFunction
                        errorMessage: message,
                        sinkName: name,
                        validationResult: validationResult
                    },
                    IMPORT_DOCUMENT_ID: data.importDocumentId,
                    SOURCE_ID: data.sourceId,
                    RECORD_KEY: data.recordKey,
                    STATUS: 0
                });
            });
        } else { // error fix
            recordsStatus.push({
                ERRORS: {
                    errorType: 'SinkError',
                    errorCause: cause,
                    errorMessage: message,
                    sinkName: name,
                    validationResult: validationResult
                },
                IMPORT_DOCUMENT_ID: input.importDocumentId,
                SOURCE_ID: input.sourceId,
                RECORD_KEY: input.recordKey,
                STATUS: 0,
                RESULT_SUMMARY: {
                    errorLineData: errorLineInput.data
                }
            });
        }
    }

    return {
        'BFX.IMPORT_RECORD_STATUS': recordsStatus
    };
};
