const { getServiceProviderData, getAgentTabNumber } = require('@config-rgsl/portfolio-transfer/lib/ptUtils');

module.exports = async function aaNumberSearchResultAssignmentTo(input, ambientProperties) {

    const selectedItems = input.getLookupSelection();
    const selectedItem = selectedItems[0].resultData;
    input.context.Body.aaNumberTo = selectedItem.documentCode;
    input.context.Body.aaNameTo = (selectedItem.manualNumber ?? selectedItem.documentCode) + '/' + selectedItem.externalNumber;

    delete input.context.Body.aaServiceProviderCodeTo;
    delete input.context.Body.aaServiceProviderNameTo;

    const spData = await getServiceProviderData(ambientProperties, selectedItem.agentCode);

    if (spData) {

        input.context.Body.aaServiceProviderCodeTo = spData.serviceProviderCode;
        input.context.Body.aaServiceProviderNameTo = spData.partyShortName || spData.partyDisplayName;
    }

    input.context.Body.agentTabNumberTo = await getAgentTabNumber(ambientProperties, input.context.Body.aaNumberTo);
};
