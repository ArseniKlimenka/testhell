'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function recipientUriMapping(input) {

    const partyCode = getValue(input, 'data.partyCode');
    const partyType = getValue(input, 'data.partyType');

    if (partyCode && partyType) {

        return uriBuilder.getPartyUri(partyType, partyCode);
    }
};
