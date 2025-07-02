module.exports = function resultMapping(input) {

    const result = input.data.map(item => {
        return {
            contractNumber: item.resultData.contractNumber,
            issueDate: item.resultData.issueDate || '',
            hasAmendment: item.resultData.hasAmendment || '',
            hasAmendmentDate: item.resultData.hasAmendmentDate || ''
        };
    });

    return result;
};
