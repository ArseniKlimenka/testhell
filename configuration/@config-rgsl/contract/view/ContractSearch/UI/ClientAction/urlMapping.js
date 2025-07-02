const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function urlMapping(input) {
    const documentNumber = getValue(input, 'data.metadata.entityId');
    const configurationCodeName = getValue(input, 'data.metadata.configurationName');
    const configurationVersion = getValue(input, 'data.metadata.configurationVersion');
    return uriBuilder.getContractUri(configurationCodeName, configurationVersion, documentNumber);
};
