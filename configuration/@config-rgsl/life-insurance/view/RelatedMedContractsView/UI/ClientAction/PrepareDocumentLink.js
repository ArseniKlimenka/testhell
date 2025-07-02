'use strict';

module.exports = function PrepareDocumentLink(input) {

    const { documentNumber, configurationCodeName } = input.data.resultData;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: 'Contract',
                configurationCodeName: configurationCodeName,
                version: 1,
                documentNumber: documentNumber
            }
        }
    };

};
