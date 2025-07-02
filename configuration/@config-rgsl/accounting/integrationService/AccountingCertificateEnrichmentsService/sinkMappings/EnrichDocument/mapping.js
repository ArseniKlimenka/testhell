'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const body = sinkExchange.body;
    const enrichFields = body?.policyEnrichments?.enrichFields ?? [];
    const configurationCodeName = input.configurationCodeName;
    const configurationVersion = input.configurationVersion;

    const result = {
        configuration: {
            name: configurationCodeName,
            version: configurationVersion,
        },
        body: body,
        enrichFields: enrichFields,
    };

    return result;
};
