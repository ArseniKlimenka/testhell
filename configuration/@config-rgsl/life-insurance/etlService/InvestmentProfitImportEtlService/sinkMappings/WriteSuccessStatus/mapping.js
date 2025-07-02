'use strict';

module.exports = function mapping(lineInput, sinkExchange) {

    const lineData = lineInput.data;

    const recordStatus = {
        IMPORT_DOCUMENT_ID: lineInput.importDocumentId,
        SOURCE_ID: lineInput.sourceId,
        RECORD_KEY: lineInput.recordKey,
        STATUS: 1,
        RESULT_ENTITY_ID: lineInput.importDocumentId,
        RESULT_SUMMARY: {
            contractNumber: lineData.contractNumber,
            investmentProfitCalculationDate: lineData.investmentProfitCalculationDate,
            investmentProfitRate: lineData.investmentProfitRate,
            investmentProfitPaymentTypeCode: lineData.investmentProfitPaymentTypeCode,
        }
    };

    return {
        'BFX.IMPORT_RECORD_STATUS': [recordStatus]
    };
};
