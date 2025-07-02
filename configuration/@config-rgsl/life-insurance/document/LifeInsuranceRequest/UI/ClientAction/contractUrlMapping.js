const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function contractUrlMapping(input) {

    const configurationVersion = 1;
    const configurationName = getValue(input, 'context.Body.contract.configurationName');
    const documentNumber = getValue(input, 'context.Body.contract.number');

    return uriBuilder.getContractUri(configurationName, configurationVersion, documentNumber);

};
