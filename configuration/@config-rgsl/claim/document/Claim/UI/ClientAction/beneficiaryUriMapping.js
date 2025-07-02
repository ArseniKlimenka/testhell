'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function beneficiaryUriMapping(input) {

    const partyCode = input?.data?.partyCode;
    const partyType = input?.data?.partyType;

    if (partyCode && partyType) {

        return uriBuilder.getPartyUri(partyType, partyCode);
    }
};
