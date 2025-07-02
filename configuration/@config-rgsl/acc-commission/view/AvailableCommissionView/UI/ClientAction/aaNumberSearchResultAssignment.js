const { getServiceProviderData } = require('@config-rgsl/acc-commission/lib/actUtils');

module.exports = async function aaNumberSearchResultAssignment(input, ambientProperties) {
    const selectedItems = input.getLookupSelection();
    input.data.request.data.criteria.aaNumber = selectedItems[0].resultData.externalNumber;

    delete input.data.request.data.criteria.aaServiceProviderCode;
    delete input.data.request.data.criteria.aaServiceProviderName;

    const agentCode = selectedItems[0].resultData.agentCode;

    if (agentCode) {
        const spData = await getServiceProviderData(ambientProperties, agentCode);

        if (spData) {
            input.data.request.data.criteria.aaServiceProviderCode = spData.serviceProviderCode;
            input.data.request.data.criteria.aaServiceProviderName = spData.partyShortName || spData.partyDisplayName;
        }
    }
};
