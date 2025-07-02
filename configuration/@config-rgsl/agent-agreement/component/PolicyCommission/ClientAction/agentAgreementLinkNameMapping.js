'use strict';

module.exports = function agentAgreementLinkNameMapping(input) {

    const agentAgreementNumber = input.componentContext.agentAgreement?.number;
    return agentAgreementNumber ? "Открыть агентский договор" : undefined;
};
