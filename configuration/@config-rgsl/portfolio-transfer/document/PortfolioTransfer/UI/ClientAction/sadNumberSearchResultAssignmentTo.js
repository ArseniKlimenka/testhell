module.exports = async function sadNumberSearchResultAssignmentTo(input) {

    const selectedItems = input.getLookupSelection();
    const selectedItem = selectedItems[0].resultData;
    input.context.Body.sadNumberTo = selectedItem.sadNumber;
};
