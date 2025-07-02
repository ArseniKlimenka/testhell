'use strict';

module.exports = function mapping(lineInput, sinkExchange) {
    const recordStatus = {
        IMPORT_DOCUMENT_ID: lineInput.importDocumentId,
        SOURCE_ID: lineInput.sourceId,
        RECORD_KEY: lineInput.recordKey,
        STATUS: 1,
        RESULT_ENTITY_ID: lineInput.importDocumentId,
        RESULT_SUMMARY: {
            excelRowNumber: lineInput.data.excelRowNumber,
            contractNumber: lineInput.data.contractNumber,
            originalReceiptDate: lineInput.data.originalReceiptDate,
            hasAmendment: lineInput.data.hasAmendment,
            hasPaymentIntermediateApplication: lineInput.data.hasPaymentIntermediateApplication,
            paymentIntermediateApplicationDate: lineInput.data.paymentIntermediateApplicationDate
        }
    };

    return {
        'BFX.IMPORT_RECORD_STATUS': [recordStatus]
    };
};
