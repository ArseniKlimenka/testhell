module.exports = function mapping(line, sinkExchange) {

    const recordStatus = {
        IMPORT_DOCUMENT_ID: line.importDocumentId,
        SOURCE_ID: line.sourceId,
        RECORD_KEY: line.recordKey,
        STATUS: 1,
        RESULT_ENTITY_ID: undefined,
        RESULT_SUMMARY: {}
    };

    return {
        'BFX.IMPORT_RECORD_STATUS': [recordStatus]
    };

};
