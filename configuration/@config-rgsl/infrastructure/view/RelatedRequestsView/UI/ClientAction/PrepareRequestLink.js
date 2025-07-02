'use strict';

module.exports = function PrepareRequestLink(input) {

    const { requestCodeName, requestNumber } = input.data.resultData;

    const entity = 'UniversalDocument';
    const version = 1;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: entity,
                configurationCodeName: requestCodeName,
                version: version,
                documentNumber: requestNumber
            }
        }
    };

};
