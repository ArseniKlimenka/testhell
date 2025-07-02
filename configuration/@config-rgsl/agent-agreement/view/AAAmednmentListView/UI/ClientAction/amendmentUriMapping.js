'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function amendmentUriMapping(input) {

    const documentCode = getValue(input, 'data.resultData.documentNumber');
    const configurationName = getValue(input, 'data.resultData.configurationName');

    if (documentCode) {

        return uriBuilder.getAgentAgreementUri(documentCode, configurationName);
    }
};
