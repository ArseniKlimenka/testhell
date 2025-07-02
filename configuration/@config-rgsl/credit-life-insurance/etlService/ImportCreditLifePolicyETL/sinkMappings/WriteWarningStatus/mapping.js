module.exports = function mapping(line, sinkExchange) {

    const recordStatuses = [];

    sinkExchange.partyExceptions.forEach(x => {
        const recordStatus = {
            ERRORS: {
                errorType: x.name,
                errorCause: x.name,
                errorMessage: `${x.msg}. Код контрагента ${sinkExchange.partyCode}.`
            },
            IMPORT_DOCUMENT_ID: line.importDocumentId,
            SOURCE_ID: line.sourceId,
            RECORD_KEY: line.recordKey,
            STATUS: 0,
            RESULT_ENTITY_ID: sinkExchange.createdPolicyId,
            RESULT_SUMMARY: {
                createdPolicyNumber: sinkExchange.createdPolicyNumber
            }
        };

        recordStatuses.push(recordStatus);
    });

    if (recordStatuses.length > 0) {
        return {
            'BFX.IMPORT_RECORD_STATUS': recordStatuses
        };
    }
};
