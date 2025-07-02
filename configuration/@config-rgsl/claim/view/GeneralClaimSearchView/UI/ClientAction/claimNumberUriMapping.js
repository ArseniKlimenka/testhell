'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function claimNumberUriMapping(input) {

    const claimNumber = input.data?.resultData?.claimNumber;
    const claimConf = input.data?.resultData?.claimConf;

    if (claimNumber) {

        if (claimConf === 'CollectiveClaim') {

            return uriBuilder.getCollectiveClaimUri(claimNumber);
        }

        return uriBuilder.getClaimUri(claimNumber);
    }
};
