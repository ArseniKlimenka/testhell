'use strict';

module.exports = function PrepareDocumentLink(input) {

    const data = input.data;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: 'Contract',
                configurationCodeName: data.documentConfCode,
                version: 1,
                documentNumber: data.documentNumber
            }
        }
    };
};
