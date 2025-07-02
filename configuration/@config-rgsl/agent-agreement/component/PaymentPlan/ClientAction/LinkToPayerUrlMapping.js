'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function LinkToPayerUrlMapping(input) {

    return uriBuilder.getPartyUri(input.data.partyType, input.data.partyCode);
};
