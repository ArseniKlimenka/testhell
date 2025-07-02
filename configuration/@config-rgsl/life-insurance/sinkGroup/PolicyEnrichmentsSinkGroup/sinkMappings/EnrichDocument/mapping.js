'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const body = sinkExchange.body;
    const enrichFields = body?.policyEnrichments?.enrichFields ?? [];
    const originalDocumentNumber = sinkExchange.originalDocumentNumber;
    const documentNumber = sinkExchange.documentNumber;
    const configurationCodeName = sinkExchange.configurationCodeName;
    const configurationVersion = sinkExchange.configurationVersion;
    const contractType = sinkExchange.contractType;

    const result = {
        number: documentNumber,
        configuration: {
            name: configurationCodeName,
            version: configurationVersion,
        },
        body: body,
        enrichFields: enrichFields,
    };

    return result;
};
