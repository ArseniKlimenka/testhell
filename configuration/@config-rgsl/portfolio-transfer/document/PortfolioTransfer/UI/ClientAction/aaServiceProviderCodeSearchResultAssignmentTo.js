const { getAgentAgreementData, getAgentTabNumber } = require('@config-rgsl/portfolio-transfer/lib/ptUtils');

module.exports = async function aaServiceProviderCodeSearchResultAssignmentTo(input, ambientProperties) {

    const selectedItems = input.getLookupSelection();

    if (selectedItems.length > 1) {

        throw "Only one item can be selected";
    }

    const agent = selectedItems[0].resultData;

    if (agent) {

        input.context.Body.aaServiceProviderCodeTo = agent.serviceProviderCode;
        input.context.Body.aaServiceProviderNameTo = agent.partyShortName || agent.partyDisplayName;

        delete input.context.Body.aaNumberTo;
        delete input.context.Body.aaNameTo;

        const aaData = await getAgentAgreementData(ambientProperties, agent.serviceProviderCode);

        if (aaData) {

            input.context.Body.aaNumberTo = aaData.documentCode;
            input.context.Body.aaNameTo = (aaData.manualNumber ?? aaData.documentCode) + '/' + aaData.externalNumber;
            input.context.Body.agentTabNumberTo = await getAgentTabNumber(ambientProperties, aaData.documentCode);
        }
    }
};
