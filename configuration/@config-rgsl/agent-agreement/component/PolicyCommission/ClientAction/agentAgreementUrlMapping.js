'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function agentAgreementUrlMapping(input) {

    const agentAgreementNumber = input.componentContext.agentAgreement?.number;

    if (!agentAgreementNumber) {

        return;
    }

    return uriBuilder.getAgentAgreementUri(agentAgreementNumber, 'AgentAgreement');
};
