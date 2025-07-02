'use strict';

module.exports = function resultMapping(input) {

    return {
        contractNumber: input.CONTRACT_NUMBER,
        partyCode: input.PARTY_CODE,
        tradingPartnerCode: input.TRADING_PARTNER_CODE,
        partyType: input.PARTY_TYPE,
        partnerType: input.PARTNER_TYPE,
        partnerManualCode: input.PARTNER_MANUAL_CODE,
        initiatorOrderNumber: input.INITIATOR_ORDER_NUMBER,
        initiatorKsp: input.INITIATOR_KSP,
    };
};
