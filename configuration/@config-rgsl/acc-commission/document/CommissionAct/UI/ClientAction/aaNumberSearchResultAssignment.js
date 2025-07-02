const { getServiceProviderData } = require('@config-rgsl/acc-commission/lib/actUtils');

module.exports = async function aaNumberSearchResultAssignment(input, ambientProperties) {
    const selectedItems = input.getLookupSelection();
    const selectedItem = selectedItems[0].resultData;
    input.context.Body.aaNumber = selectedItem.documentCode;
    input.context.Body.aaName = (selectedItem.manualNumber ?? selectedItem.documentCode) + '/' + selectedItem.externalNumber;
    input.context.Body.isDocCorrect = selectedItem.isDocCorrect;

    delete input.context.Body.aaServiceProviderCode;
    delete input.context.Body.aaServiceProviderName;
    delete input.context.Body.agentBusinessCode;

    const spData = await getServiceProviderData(ambientProperties, selectedItem.agentCode);

    if (spData) {
        input.context.Body.aaServiceProviderCode = spData.serviceProviderCode;
        input.context.Body.aaServiceProviderName = spData.partyShortName || spData.partyDisplayName;
        input.context.Body.agentBusinessCode = spData.businessCode;
    }
};
