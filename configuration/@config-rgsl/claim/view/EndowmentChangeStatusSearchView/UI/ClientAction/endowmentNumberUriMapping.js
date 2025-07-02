'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");
const { claimConfigurantionNames } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function endowmentNumberUriMapping(input) {

    const endowmentNumber = input.data?.resultData?.endowmentNumber;

    if (endowmentNumber) {

        return uriBuilder.getUniverslaDocumentUri(endowmentNumber, claimConfigurantionNames.endowment);
    }
};
