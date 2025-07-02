module.exports = async function aaServiceProviderCodeSearchResultAssignment(input, ambientProperties) {
    const selectedItems = input.getLookupSelection();

    if (selectedItems.length === 0) {
        return;
    }

    const selectedItem = selectedItems[0].resultData;
    if (selectedItem) {
        input.data.request.data.criteria.aaServiceProviderCode = selectedItem.serviceProviderCode;
    }
};
