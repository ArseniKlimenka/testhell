const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function contractUrlMapping(input) {

    const configurationName = input.context.OriginalConfigurationCodeName;
    const configurationVersion = input.context.OriginalConfigurationVersion;
    const documentNumber = getValue(input, 'context.Body.technicalInformation.originalDocumentNumber');

    return uriBuilder.getContractUri(configurationName, configurationVersion, documentNumber);

};
