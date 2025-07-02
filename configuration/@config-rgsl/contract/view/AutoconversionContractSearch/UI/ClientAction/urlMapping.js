const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function urlMapping(input) {

    const configurationVersion = 1;
    const configurationName = input.data.resultData.contractConfigurationName;
    const documentNumber = input.data.resultData.contractNumber;

    return uriBuilder.getContractUri(configurationName, configurationVersion, documentNumber);
};
