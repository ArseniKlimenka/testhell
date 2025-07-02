module.exports = function policyHolderSearchResultAssignment(input) {
    const selectedItems = input.getLookupSelection();
    if (selectedItems.length > 1) {
        throw "Only one item can be selected";
    }

    const policyHolder = selectedItems[0].resultData;
    input.data.request.data.criteria.policyHolderCode = policyHolder.code;
};
