'use strict';

module.exports = function PrepareDocumentLink(input) {

    const { contractNumber, configurationName } = input.data.resultData;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: 'Contract',
                configurationCodeName: configurationName,
                version: 1,
                documentNumber: contractNumber
            }
        }
    };

};
