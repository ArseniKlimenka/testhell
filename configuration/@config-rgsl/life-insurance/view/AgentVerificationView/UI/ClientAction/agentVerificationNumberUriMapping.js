'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function agentVerificationNumberUriMapping(input) {

    const documentNumber = input.data?.resultData?.documentNumber;

    if (documentNumber) {

        return uriBuilder.getUniverslaDocumentUri(documentNumber, 'AgentVerification');
    }
};
