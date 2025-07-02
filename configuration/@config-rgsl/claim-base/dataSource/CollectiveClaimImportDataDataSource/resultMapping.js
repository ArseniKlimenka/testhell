module.exports = function resultMapping(input) {

    const dataJson = input.DATA;
    const dataObject = JSON.parse(dataJson);

    const ret = {
        claimNumber: input.CLAIM_NUMBER,
        claimId: input.CLAIM_ID,
        contractNumber: input.CONTRACT_NUMBER,
        importDocumentId: input.IMPORT_DOCUMENT_ID,
        importDocumentNumber: input.IMPORT_DOCUMENT_NUMBER,
        sourceId: input.SOURCE_ID,
        recordKey: input.RECORD_KEY,
        data: dataObject
    };

    return ret;
};
