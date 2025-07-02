'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function prepareContractLink(input) {

    const configuration = {
        name: input.data.resultData.contractConfCodeName,
        configurationVersion: 1
    };

    return uriBuilder.getDocumentUri("Contract", configuration, input.data.resultData.contractNumber);
};
