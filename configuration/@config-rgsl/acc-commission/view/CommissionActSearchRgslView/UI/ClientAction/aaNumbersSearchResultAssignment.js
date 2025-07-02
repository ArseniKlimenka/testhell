const { getServiceProviderData } = require('@config-rgsl/acc-commission/lib/actUtils');

module.exports = async function aaNumbersSearchResultAssignment(input, ambientProperties) {
    const selectedItems = input.getLookupSelection();
    input.data.request.data.criteria.aaNumbers = selectedItems.map(item => item.resultData.documentCode);

    delete input.data.request.data.criteria.aaServiceProviderCode;
    delete input.data.request.data.criteria.aaServiceProviderName;

    const aaServiceProviderCode = selectedItems[0].resultData.agentCode;
    let isOneServiceProvider = true;

    if (selectedItems.length > 1) {
        isOneServiceProvider = selectedItems.every(item => item.resultData.agentCode === aaServiceProviderCode);
    }

    if (isOneServiceProvider) {
        const spData = await getServiceProviderData(ambientProperties, aaServiceProviderCode);

        if (spData) {
            input.data.request.data.criteria.aaServiceProviderCode = spData.serviceProviderCode;
            input.data.request.data.criteria.aaServiceProviderName = spData.partyShortName || spData.partyDisplayName;
        }
    }
};
