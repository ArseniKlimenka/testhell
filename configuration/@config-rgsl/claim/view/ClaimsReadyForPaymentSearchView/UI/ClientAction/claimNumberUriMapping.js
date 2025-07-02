'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function claimNumberUriMapping(input) {

    const claimNumber = input.data?.resultData?.claimNumber;

    if (claimNumber) {

        return uriBuilder.getClaimUri(claimNumber);
    }
};
