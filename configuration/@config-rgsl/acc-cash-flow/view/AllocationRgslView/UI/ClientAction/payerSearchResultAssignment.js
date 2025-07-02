module.exports = function payerSearchResultAssignment(input) {
    input.data.request.data.criteria.payerName = input.getLookupSelection()[0].resultData.fullName;
};
