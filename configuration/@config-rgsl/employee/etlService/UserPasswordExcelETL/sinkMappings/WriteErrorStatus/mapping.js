module.exports = function mapping(errorLineInput) {

    const recordsStatus = [];

    // Input can be null if mainDataSource or data provider has failed with ResultMappingFunction or DataProvider cause
    const { input } = errorLineInput;
    let { message } = errorLineInput;

    if (message.indexOf('Exception has been thrown by the target of an invocation. Пользователь с именем пользователя') !== -1
        ||
        message.indexOf('Exception has been thrown by the target of an invocation. User with username') !== -1
    )
    { message = 'Пользователь отсутствует'; }
    if (message.indexOf('Пользователь неактивен') !== -1)
    { message = 'Пользователь неактивен'; }
    if (message.indexOf('Пользователь заблокирован') !== -1)
    { message = 'Пользователь заблокирован'; }
    if (message.indexOf('E-mail отсутствует') !== -1)
    { message = 'E-mail отсутствует'; }

    if (errorLineInput.dataSource) {
        const { cause, rawData } = errorLineInput.dataSource;

        recordsStatus.push({
            ERRORS: {
                errorType: 'DataSourceError',
                errorCause: cause, // MappingFunction | Processing | ApplyFunction
                errorMessage: message,
                username: input.data.userName
            },
            IMPORT_DOCUMENT_ID: rawData.IMPORT_DOCUMENT_ID,
            SOURCE_ID: rawData.SOURCE_ID,
            RECORD_KEY: rawData.RECORD_KEY,
            STATUS: 0
        });
    } else if (errorLineInput.sink) {
        // mappingResult can be null if mapping has failed
        const { name, cause, mappingResult } = errorLineInput.sink;

        if (input.resultData) {
            input.resultData.forEach(data => {
                recordsStatus.push({
                    ERRORS: {
                        errorType: 'SinkError',
                        errorCause: cause, // MappingFunction | Processing | ApplyFunction
                        errorMessage: message,
                        username: input.data.userName
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
                    username: input.data.userName
                },
                IMPORT_DOCUMENT_ID: input.importDocumentId,
                SOURCE_ID: input.sourceId,
                RECORD_KEY: input.recordKey,
                STATUS: 0,
                RESULT_SUMMARY: {
                    fullName: input.data.fullName,
                    nameSink: name
                }
            });
        }
    }

    return {
        'BFX.IMPORT_RECORD_STATUS': recordsStatus
    };
};
