module.exports = async function aaExternalNumberSearchResultAssignment(input, ambientProperties) {
    const selectedItems = input.getLookupSelection();
    const aaExternalNumbers = selectedItems.map(item => item.resultData.externalNumber);
    if (aaExternalNumbers.length === 1) {
        input.data.request.data.criteria.aaExternalNumber = aaExternalNumbers[0];
    }
    else {
        input.data.request.data.criteria.aaExternalNumber = undefined;
    }
};
