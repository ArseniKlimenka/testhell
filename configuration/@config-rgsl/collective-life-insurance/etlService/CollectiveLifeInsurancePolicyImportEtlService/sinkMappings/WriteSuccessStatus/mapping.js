module.exports = function mapping(line, sinkExchange) {

    const recordStatus = {
        IMPORT_DOCUMENT_ID: line.importDocumentId,
        SOURCE_ID: line.sourceId,
        RECORD_KEY: line.recordKey,
        STATUS: 1,
        RESULT_ENTITY_ID: sinkExchange.createdPolicyId,
        RESULT_SUMMARY: {
            importRowNumber: line.data.importRowNumber,
            surName: line.data.surName,
            firstName: line.data.firstName,
            middleName: line.data.middleName,
            birthDay: line.data.birthDay,
            gender: line.data.gender,
            mobile: line.data.mobile,
            amount: line.data.amount,
            premium: line.data.premium
        }
    };

    return {
        'BFX.IMPORT_RECORD_STATUS': [recordStatus]
    };

};
