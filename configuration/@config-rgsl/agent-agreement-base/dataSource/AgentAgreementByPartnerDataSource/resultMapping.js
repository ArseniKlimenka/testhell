'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.agentAgreementId = input.AGENT_AGREEMENT_ID;
    output.agentAgreementNumber = input.AGENT_AGREEMENT_NUMBER;
    output.manualNumber = input.MANUAL_NUMBER;
    output.externalNumber = input.EXTERNAL_NUMBER;
    output.partnerCode = input.PARTNER_CODE;
    output.partyCode = input.PARTY_CODE;

    return output;
};
