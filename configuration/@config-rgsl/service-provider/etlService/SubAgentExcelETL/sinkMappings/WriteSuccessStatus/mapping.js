module.exports = function mapping(line, sinkExchange) {

    const recordStatus = {
        IMPORT_DOCUMENT_ID: line.importDocumentId,
        SOURCE_ID: line.sourceId,
        RECORD_KEY: line.recordKey,
        STATUS: 1,
        RESULT_ENTITY_ID: null,
        RESULT_SUMMARY: {
            fullName: line.data.physicalPersonFullName,
            username: line.data.sadNumber
        }
    };

    return {
        'BFX.IMPORT_RECORD_STATUS': [recordStatus]
    };
};
