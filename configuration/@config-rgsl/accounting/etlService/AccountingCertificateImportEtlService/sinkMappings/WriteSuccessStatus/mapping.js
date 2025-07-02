module.exports = function mapping(lineInput, sinkExchange) {

    const recordStatus = {
        IMPORT_DOCUMENT_ID: lineInput.importDocumentId,
        SOURCE_ID: lineInput.sourceId,
        RECORD_KEY: lineInput.recordKey,
        STATUS: 1,
        RESULT_ENTITY_ID: sinkExchange.createdCertificateId,
        RESULT_SUMMARY: {
            createdCertificateNumber: sinkExchange.createdCertificateNumber
        }
    };

    return {
        'BFX.IMPORT_RECORD_STATUS': [recordStatus]
    };
};
