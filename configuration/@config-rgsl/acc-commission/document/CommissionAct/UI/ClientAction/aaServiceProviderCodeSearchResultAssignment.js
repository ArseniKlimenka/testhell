const { getAgentAgreementData } = require('@config-rgsl/acc-commission/lib/actUtils');

module.exports = async function aaServiceProviderCodeSearchResultAssignment(input, ambientProperties) {
    const selectedItems = input.getLookupSelection();
    if (selectedItems.length > 1) {
        throw "Only one item can be selected";
    }

    const agent = selectedItems[0].resultData;
    if (agent) {
        input.context.Body.aaServiceProviderCode = agent.serviceProviderCode;
        input.context.Body.aaServiceProviderName = agent.partyShortName || agent.partyDisplayName;
        input.context.Body.agentBusinessCode = agent.businessCode;
        delete input.context.Body.aaNumber;
        delete input.context.Body.aaName;

        const aaData = await getAgentAgreementData(ambientProperties, agent.serviceProviderCode);

        if (aaData) {
            input.context.Body.aaNumber = aaData.documentCode;
            input.context.Body.aaName = (aaData.manualNumber ?? aaData.documentCode) + '/' + aaData.externalNumber;
            input.context.Body.isDocCorrect = aaData.isDocCorrect;
        }
    }
};
