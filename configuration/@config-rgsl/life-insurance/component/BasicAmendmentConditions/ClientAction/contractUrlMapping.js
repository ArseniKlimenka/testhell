const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function contractUrlMapping(input) {

    const configurationName = input.context.OriginalConfigurationCodeName;
    const configurationVersion = input.context.OriginalConfigurationVersion;
    const documentNumber = input.context.OriginalDocumentNumber;

    return uriBuilder.getContractUri(configurationName, configurationVersion, documentNumber);

};
