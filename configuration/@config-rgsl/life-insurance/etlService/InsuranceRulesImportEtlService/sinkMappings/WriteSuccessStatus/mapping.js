'use strict';

module.exports = function mapping(lineInput, sinkExchange) {

    if (sinkExchange.globalContext?.counters?.errorCount > 0) {
        return;
    }

    const lineData = lineInput.data;
    const nextVersion = sinkExchange.maxVersion + 1;

    const recordStatus = {
        IMPORT_DOCUMENT_ID: lineInput.importDocumentId,
        SOURCE_ID: lineInput.sourceId,
        RECORD_KEY: lineInput.recordKey,
        STATUS: 1,
        RESULT_ENTITY_ID: lineInput.importDocumentId,
        RESULT_SUMMARY: {
            excelRowNumber: lineData.excelRowNumber,
            ruleNumber: lineData.ruleNumber,
            ruleCode : lineData.ruleCode,
            ruleDescription : lineData.ruleDescription,
            ruleDate : lineData.ruleDate,
            ruleLink : lineData.ruleLink,
            version: nextVersion
        }
    };

    return {
        'BFX.IMPORT_RECORD_STATUS': [recordStatus]
    };
};
