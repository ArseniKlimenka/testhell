'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function agentAgeementCodeUriMapping(input) {

    const documentCode = getValue(input, 'data.resultData.documentCode');

    if (documentCode) {

        return uriBuilder.getAgentAgreementUri(documentCode, 'AgentAgreement');
    }
};
