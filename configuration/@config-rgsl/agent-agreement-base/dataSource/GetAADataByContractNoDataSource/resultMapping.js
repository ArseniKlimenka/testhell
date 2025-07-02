'use strict';


const { nullCheck } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function resultMapping(input) {

    const output = {};
    output.contractNumber = input.CONTRACT_NUMBER;
    output.number = input.AA_NUMBER;
    output.manualNumber = input.MANUAL_NUMBER;
    output.mvzNumber = nullCheck(input.MVZ_NUMBER);
    output.agentPartyCode = nullCheck(input.AGENT_PARTY_CODE);
    output.agentPartnerType = input.PARTNER_TYPE;
    output.agentPartyConfigurationCodeName = input.PARTY_CONFIGURATION_CODE_NAME;
    output.agentPartyTradingPartnerCode = nullCheck(input.PARTY_TRADING_PARTNER_CODE)?.toString();
    output.orderNumber = nullCheck(input.ORDER_NUMBER);

    return output;
};
