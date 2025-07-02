const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function resultMapping(input) {
    const partyConf = input.PARTY_CONFIGURATION;

    return {
        agentName: partyConf ? (partyConf.toString() === partyConstants.partyType.LegalEntity ? input.AGENT_SHORT_NAME : input.AGENT_FULL_NAME) : '',
        aaExternalNumber: input.AA_EXTERNAL_NUMBER,
    };
};
