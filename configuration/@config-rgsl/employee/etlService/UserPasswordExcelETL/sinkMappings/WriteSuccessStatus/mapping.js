module.exports = function mapping(line, sinkExchange) {

    const user = sinkExchange.resolveContext('keycloakUser');

    const recordStatus = {
        IMPORT_DOCUMENT_ID: line.importDocumentId,
        SOURCE_ID: line.sourceId,
        RECORD_KEY: line.recordKey,
        STATUS: 1,
        RESULT_ENTITY_ID: undefined,
        RESULT_SUMMARY: {
            externalId: user.id,
            fullName: line.data.fullName,
            username: user.username,
            password: sinkExchange.password,
            sendEmail: line.data.sendEmail,
            email: sinkExchange.email
        }
    };

    return {
        'BFX.IMPORT_RECORD_STATUS': [recordStatus]
    };
};
