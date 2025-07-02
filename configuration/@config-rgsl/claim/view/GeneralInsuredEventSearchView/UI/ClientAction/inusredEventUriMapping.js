'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");
const { claimConfigurantionNames } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function inusredEventUriMapping(input) {

    const documentNumber = input.data?.resultData?.documentNumber;

    if (documentNumber) {

        return uriBuilder.getUniverslaDocumentUri(documentNumber, claimConfigurantionNames.insuredEvent);
    }
};
