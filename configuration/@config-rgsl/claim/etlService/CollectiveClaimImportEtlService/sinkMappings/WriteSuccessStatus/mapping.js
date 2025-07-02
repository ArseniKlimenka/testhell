module.exports = function mapping(line, sinkExchange) {

    const recordStatus = {
        IMPORT_DOCUMENT_ID: line.importDocumentId,
        SOURCE_ID: sinkExchange.globalContext.claimId,
        RECORD_KEY: line.recordKey,
        STATUS: 1,
        RESULT_ENTITY_ID: sinkExchange.claimId,
        RESULT_SUMMARY: {
            importRowNumber: line.data.importRowNumber,
            fullName: line.data.fullName,
            birthDate: line.data.birthDate,
            amount: line.data.amount,
            franchise: line.data.franchise,
            totalAmount: line.data.totalAmount,
            insuredEventDate: line.data.insuredEventDate,
            serviceDescription: line.data.serviceDescription,
            serviceProviderName: line.data.serviceProviderName
        }
    };

    return {
        'BFX.IMPORT_RECORD_STATUS': [recordStatus]
    };

};
