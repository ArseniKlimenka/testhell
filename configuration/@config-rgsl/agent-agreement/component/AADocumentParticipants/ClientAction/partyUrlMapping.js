'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function partyUrlMapping(input) {

    const partyType = input.componentContext.agent?.partyType;
    const partyCode = input.componentContext.agent?.partyCode;

    if (!partyType || !partyCode) {

        return;
    }

    return uriBuilder.getPartyUri(partyType, partyCode);
};
