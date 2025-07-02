const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function urlMapping(input) {
    const documentNumber = input.data.metadata.entityId;
    const configurationCodeName = input.data.metadata.configurationName;
    const configurationVersion = input.data.metadata.configurationVersion;
    return uriBuilder.getContractUri(configurationCodeName, configurationVersion, documentNumber);
};
