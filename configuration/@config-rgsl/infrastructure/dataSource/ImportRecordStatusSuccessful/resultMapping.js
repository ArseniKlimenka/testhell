module.exports = function resultMapping(input) {
    const ret = {
        importDocumentId: input.IMPORT_DOCUMENT_ID,
        sourceId: input.SOURCE_ID,
        recordKey: input.RECORD_KEY,
        resultEntityId: input.RESULT_ENTITY_ID,
        resultSummary: JSON.parse(input.RESULT_SUMMARY)
    };

    return ret;
};
