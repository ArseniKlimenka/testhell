'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function contractUrlMapping(input) {

    const configurationVersion = 1;
    const configurationName = input.componentContext.configurationName;
    const documentNumber = input.componentContext.number;

    return uriBuilder.getContractUri(configurationName, configurationVersion, documentNumber);

};
