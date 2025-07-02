const { getServiceProviderData, getAgentTabNumber } = require('@config-rgsl/portfolio-transfer/lib/ptUtils');

module.exports = async function aaNumberSearchResultAssignmentFrom(input, ambientProperties) {

    const selectedItems = input.getLookupSelection();
    const selectedItem = selectedItems[0].resultData;
    input.context.Body.aaNumberFrom = selectedItem.documentCode;
    input.context.Body.aaNameFrom = (selectedItem.manualNumber ?? selectedItem.documentCode) + '/' + selectedItem.externalNumber;

    delete input.context.Body.aaServiceProviderCodeFrom;
    delete input.context.Body.aaServiceProviderNameFrom;

    const spData = await getServiceProviderData(ambientProperties, selectedItem.agentCode);

    if (spData) {

        input.context.Body.aaServiceProviderCodeFrom = spData.serviceProviderCode;
        input.context.Body.aaServiceProviderNameFrom = spData.partyShortName || spData.partyDisplayName;
    }

    input.context.Body.agentTabNumberFrom = await getAgentTabNumber(ambientProperties, input.context.Body.aaNumberFrom);
};
