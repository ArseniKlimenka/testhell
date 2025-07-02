module.exports = function mapping(line, sinkExchange) {

    const recordStatus = {
        IMPORT_DOCUMENT_ID: line.importDocumentId,
        SOURCE_ID: line.sourceId,
        RECORD_KEY: line.recordKey,
        STATUS: 1,
        RESULT_ENTITY_ID: sinkExchange.createdPolicyId,
        RESULT_SUMMARY: {
            createdPolicyNumber: sinkExchange.createdPolicyNumber
        }
    };

    return {
        'BFX.IMPORT_RECORD_STATUS': [recordStatus]
    };

};
