module.exports = function resultMapping(input) {

    const result = input.data.map(item => ({
        importDocumentId: item.resultData.importDocumentId ? item.resultData.importDocumentId : '',
        recordKey: item.resultData.recordKey ? item.resultData.recordKey : '',
        fullName: item.resultData.resultSummary.fullName ? item.resultData.resultSummary.fullName : '',
        username: item.resultData.resultSummary.username ? item.resultData.resultSummary.username : '',
        password: item.resultData.resultSummary.password ? item.resultData.resultSummary.password : ''
    }));

    return result;
};
