module.exports = function mapping(errorLineInput, sinkExchange) {
    const recordStatus = {
        STATUS: 0,
        ERRORS: {
            errorMessage: errorLineInput.message
        }
    };

    // Input can be null if mainDataSource or data provider has failed with ResultMappingFunction or DataProvider cause
    const { message, input } = errorLineInput;

    if (errorLineInput.dataSource) {
        const { cause, rawData } = errorLineInput.dataSource;

        recordStatus.ERRORS.errorType = "DataSourceError";
        recordStatus.ERRORS.errorCause = cause; // DataProvider | ResultMappingFunction | OutputValidation

        recordStatus.IMPORT_DOCUMENT_ID = rawData.IMPORT_DOCUMENT_ID;
        recordStatus.SOURCE_ID = rawData.SOURCE_ID;
        recordStatus.RECORD_KEY = rawData.RECORD_KEY;
    } else if (errorLineInput.sink) {
        // mappingResult can be null if mapping has failed
        const { name, cause, mappingResult } = errorLineInput.sink;

        const stackTrace = errorLineInput.stackTrace;
        const exceptionType = errorLineInput.exceptionType;

        recordStatus.ERRORS.errorType = "SinkError";
        recordStatus.ERRORS.errorCause = cause; // MappingFunction | Processing | ApplyFunction

        recordStatus.IMPORT_DOCUMENT_ID = input.importDocumentId;
        recordStatus.SOURCE_ID = input.sourceId;
        recordStatus.RECORD_KEY = input.recordKey;

        recordStatus.ERRORS.errorMessage = errorLineInput.businessErrors != undefined && errorLineInput.businessErrors.length > 0 ? errorLineInput.businessErrors[0].message : errorLineInput.message;
    }

    return {
        'BFX.IMPORT_RECORD_STATUS': [recordStatus]
    };
};
