module.exports = async function sadNumberSearchResultAssignmentFrom(input) {

    const selectedItems = input.getLookupSelection();
    const selectedItem = selectedItems[0].resultData;
    input.context.Body.sadNumberFrom = selectedItem.sadNumber;
};
