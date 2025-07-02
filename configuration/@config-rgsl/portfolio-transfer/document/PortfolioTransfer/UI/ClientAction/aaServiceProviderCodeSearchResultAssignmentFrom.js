const { getAgentAgreementData, getAgentTabNumber } = require('@config-rgsl/portfolio-transfer/lib/ptUtils');

module.exports = async function aaServiceProviderCodeSearchResultAssignmentFrom(input, ambientProperties) {

    const selectedItems = input.getLookupSelection();

    if (selectedItems.length > 1) {

        throw "Only one item can be selected";
    }

    const agent = selectedItems[0].resultData;

    if (agent) {

        input.context.Body.aaServiceProviderCodeFrom = agent.serviceProviderCode;
        input.context.Body.aaServiceProviderNameFrom = agent.partyShortName || agent.partyDisplayName;

        delete input.context.Body.aaNumberFrom;
        delete input.context.Body.aaNameFrom;

        const aaData = await getAgentAgreementData(ambientProperties, agent.serviceProviderCode);

        if (aaData) {

            input.context.Body.aaNumberFrom = aaData.documentCode;
            input.context.Body.aaNameFrom = (aaData.manualNumber ?? aaData.documentCode) + '/' + aaData.externalNumber;
            input.context.Body.agentTabNumberFrom = await getAgentTabNumber(ambientProperties, aaData.documentCode);
        }
    }
};
