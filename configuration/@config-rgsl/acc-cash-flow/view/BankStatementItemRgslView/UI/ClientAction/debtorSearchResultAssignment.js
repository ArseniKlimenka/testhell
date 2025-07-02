module.exports = function debtorSearchResultAssignment(input) {
    input.data.request.data.criteria.debtorName = input.getLookupSelection()[0].resultData.fullName;
};
