const { allocationDocumentType } = require('@config-rgsl/acc-base/lib/accConsts');

module.exports = async function onSelectionChanged(input, ambientProperties) {

    const items = input.actionData.selection.added;
    const eventArgs = {};

    if (items.length === 1) {
        const item = items[0].resultData;
        eventArgs.parameters = {
            documentNo: item.documentNo,
            currencyCode: item.currencyCode,
            documentType: allocationDocumentType.POLICY,
        };
    }

    await ambientProperties.services.util.raiseEvent('DOCUMENT_SELECTION_CHANGED', eventArgs);
};
