'use strict';

const { partyType } = require('@config-rgsl/agent-agreement-base/lib/AAConsts');
const { getPartyData } = require('@config-rgsl/life-insurance/lib/partyUtils');

module.exports = async function agentOnSelected(input, ambientProperties) {

    const lookupSelection = input.getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const selectedAgent = lookupSelection[0].resultData;

        input.componentContext.agent = {};
        const agent = input.componentContext.agent;
        agent.serviceProviderCode = selectedAgent.serviceProviderCode;
        agent.serviceProviderType = selectedAgent.serviceProviderType;
        agent.partyCode = selectedAgent.partyCode;
        agent.fullName = selectedAgent.partyDisplayName;
        agent.businessCode = selectedAgent.businessCode;
        agent.personalNumber = undefined;

        const agentPartyData = await getPartyData(ambientProperties, this, selectedAgent.partyCode);

        if (agentPartyData) {

            agent.partyType = agentPartyData.partyType;
            agent.partyBody = agentPartyData.body;
            agent.personalNumber = agentPartyData.tabNumber;

            if (agentPartyData.partyType === partyType.legalEntity) {

                input.rootContext.Body.additionalAttributes.useNds = true;
            }
        }

    }

    this.view.getControlByElementId("agentBankAccountId")?.clear();
    this.view.rebind();
};
