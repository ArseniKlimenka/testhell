const { getAgentAgreementData } = require('@config-rgsl/acc-commission/lib/actUtils');

module.exports = async function aaServiceProviderCodeSearchResultAssignment(input, ambientProperties) {
    const selectedItems = input.getLookupSelection();
    if (selectedItems.length > 1) {
        throw "Only one item can be selected";
    }

    const agent = selectedItems[0].resultData;
    if (agent) {
        input.data.request.data.criteria.aaServiceProviderCode = agent.serviceProviderCode;
        input.data.request.data.criteria.aaServiceProviderName = agent.partyShortName || agent.partyDisplayName;
        input.data.request.data.criteria.aaNumbers = undefined;

        const aaData = await getAgentAgreementData(ambientProperties, agent.serviceProviderCode);

        if (aaData) {
            input.data.request.data.criteria.aaNumbers = [aaData.documentCode];
        }
    }
};
