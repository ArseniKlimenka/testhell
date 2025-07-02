module.exports = function creditorSearchResultAssignment(input) {
    input.data.request.data.criteria.creditorName = input.getLookupSelection()[0].resultData.fullName;
};
