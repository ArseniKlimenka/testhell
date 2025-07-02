'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function partyUrlMapping(input) {

    const dataProperty = input.dataProperty;
    if (!dataProperty) {
        return;
    }

    const partyType = input.data[dataProperty]?.partyType;
    const partyCode = input.data[dataProperty]?.partyCode;
    if (!partyType || !partyCode) {
        return;
    }

    return uriBuilder.getPartyUri(partyType, partyCode);

};
