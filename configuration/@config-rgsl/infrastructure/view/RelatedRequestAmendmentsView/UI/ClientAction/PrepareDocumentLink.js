'use strict';

module.exports = function PrepareDocumentLink(input) {
    const { entityType, codeName, configurationVersion, documentNumber } = input.data.related;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: entityType,
                configurationCodeName: codeName,
                version: configurationVersion,
                documentNumber: documentNumber
            }
        }
    };
};
