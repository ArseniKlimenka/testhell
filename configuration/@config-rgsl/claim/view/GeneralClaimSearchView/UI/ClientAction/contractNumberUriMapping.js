'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function contractNumberUriMapping(input) {

    const contractNumber = input.data?.resultData?.contractNumber;
    const contractConfigurationName = input.data?.resultData?.contractConfigurationName;
    const contractConfigurationVersion = input.data?.resultData?.contractConfigurationVersion;

    if (contractNumber) {

        return uriBuilder.getContractUri(contractConfigurationName, contractConfigurationVersion, contractNumber);
    }
};
