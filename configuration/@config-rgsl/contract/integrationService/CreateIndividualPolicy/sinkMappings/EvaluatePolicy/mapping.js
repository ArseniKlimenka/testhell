"use strict";

const { productGroupToConfigurationMapping } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input, sinkExchange) {
    const body = sinkExchange.resolveContext('body');
    const productGroup = sinkExchange.resolveContext('productGroup');
    const configurationName = productGroupToConfigurationMapping[productGroup];
    const enrichFields = body?.policyEnrichments?.enrichFields ?? [];
    sinkExchange.mapContext('configurationName', configurationName);

    return {
        body,
        configurationName: configurationName,
        enrichFields: enrichFields
    };
};
