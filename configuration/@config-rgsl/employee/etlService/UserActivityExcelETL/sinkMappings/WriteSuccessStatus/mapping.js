module.exports = function mapping(line, sinkExchange) {

    const user = sinkExchange.user;


    const recordStatus = {
        IMPORT_DOCUMENT_ID: line.importDocumentId,
        SOURCE_ID: line.sourceId,
        RECORD_KEY: line.recordKey,
        STATUS: 1,
        RESULT_ENTITY_ID: user.id,
        RESULT_SUMMARY: {
            userId: user.UserId,
            fullName: line.data.fullName,
            username: user.Username,
            password: sinkExchange.password
        }
    };

    return {
        'BFX.IMPORT_RECORD_STATUS': [recordStatus]
    };
};
