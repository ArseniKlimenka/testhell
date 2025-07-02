'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function contractUrlMapping(input) {

    const contractNumber = getValue(input, 'data.resultData.contractNumber');
    const contractConfName = getValue(input, 'data.resultData.contractConfName');
    const configurationVersion = 1;

    return uriBuilder.getContractUri(contractConfName, configurationVersion, contractNumber);

};
