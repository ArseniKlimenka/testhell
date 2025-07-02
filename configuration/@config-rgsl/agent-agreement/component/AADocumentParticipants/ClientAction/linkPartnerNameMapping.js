'use strict';

module.exports = function linkPartnerNameMapping(input) {

    const partyCode = input.componentContext.agent?.partyCode;
    return partyCode ? "Открыть карточку партнера" : undefined;
};
