'use strict';

module.exports = function agentResultMapping(input) {

    const lookupSelection = input.getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const agent = lookupSelection[0].resultData;

        input.context.request.data.criteria.agentServiceProviderCode = agent.serviceProviderCode;
        input.context.request.data.criteria.agentName = agent.partyShortName || agent.partyDisplayName;
    }
};
