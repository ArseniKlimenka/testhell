module.exports = function poSearchResultAssignment(input) {
    const context = input.context.viewContext;

    const selectedItems = input.getLookupSelection();
    if (selectedItems.length > 1) {
        throw "Only one item can be selected";
    }

    const po = selectedItems[0].resultData;
    input.data.request.data.criteria.poNo = po.paymentOrderNumber;
};
