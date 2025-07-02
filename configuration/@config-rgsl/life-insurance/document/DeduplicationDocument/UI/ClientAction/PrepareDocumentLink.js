'use strict';

module.exports = function PrepareDocumentLink(input) {

    const { NUMBER, ENTITY, CODE_NAME, PUBLISHED_VERSION } = input.data;

    if (ENTITY == 'ServiceProvider') {
        return {
            path: '/edit',
            parametersData: {
                parameters: {
                    entity: ENTITY,
                    configurationCodeName: CODE_NAME,
                    version: PUBLISHED_VERSION,
                    code: NUMBER
                }
            }
        };
    }
    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: ENTITY,
                configurationCodeName: CODE_NAME,
                version: PUBLISHED_VERSION,
                documentNumber: NUMBER
            }
        }
    };


};
