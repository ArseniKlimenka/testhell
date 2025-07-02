module.exports = function resultMapping(input) {

    const result = input.data.map(item => ({
        importDocumentId: item.resultData.importDocumentId ? item.resultData.importDocumentId : '',
        recordKey: item.resultData.recordKey ? item.resultData.recordKey : '',
        errorType: item.resultData.errors.errorType ? item.resultData.errors.errorType : '',
        errorMessage: item.resultData.errors.errorMessage ? item.resultData.errors.errorMessage : '',
        fullName: item.resultData.resultSummary.fullName ? item.resultData.resultSummary.fullName : '',
        username: item.resultData.resultSummary.username ? item.resultData.resultSummary.username : '',
        nameSink: item.resultData.resultSummary.nameSink ? item.resultData.resultSummary.nameSink : ''
    }));

    return result;
};
