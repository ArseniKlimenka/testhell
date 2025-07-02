'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    return {
        body: input.body,
        originalDocumentNumber: input.originalDocumentNumber,
        documentNumber: input.documentNumber,
        configurationCodeName: input.configurationCodeName,
        configurationVersion: input.configurationVersion,
        contractType: input.contractType,
    };
};
