'use strict';

module.exports = function PrepareDocumentLink(input) {
    const { publishedArtifactCode, contractNumber } = input.data.resultData;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: 'Contract',
                configurationCodeName: publishedArtifactCode,
                version: '1',
                documentNumber: contractNumber
            }
        }
    };
};
