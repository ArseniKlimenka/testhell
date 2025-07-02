module.exports = function mapping(lineInput, sinkExchange) {
    const item = lineInput.data.items[0];

    const recordStatus = {
        IMPORT_DOCUMENT_ID: lineInput.importDocumentId,
        SOURCE_ID: lineInput.sourceId,
        RECORD_KEY: lineInput.recordKey,
        STATUS: 1,
        RESULT_ENTITY_ID: lineInput.importDocumentId,
        RESULT_SUMMARY: {
            bankStatementNo: item.bankStatementItemNo,
            statementDate: item.paymentDate,
            bankAccountNo: item.creditor.bankAccountNo,
            currency: item.currencyCode,
            statementIdentifier: item.bankStatementItemNo,
        }
    };

    return {
        'BFX.IMPORT_RECORD_STATUS': [recordStatus]
    };
};
