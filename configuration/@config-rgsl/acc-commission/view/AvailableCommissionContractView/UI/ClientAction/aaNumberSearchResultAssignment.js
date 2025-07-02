module.exports = async function aaNumberSearchResultAssignment(input, ambientProperties) {
    const selectedItems = input.getLookupSelection();

    if (selectedItems.length === 0) {
        return;
    }

    const selectedItem = selectedItems[0].resultData;

    input.data.request.data.criteria.aaNumber = selectedItem.documentNumber;
};
