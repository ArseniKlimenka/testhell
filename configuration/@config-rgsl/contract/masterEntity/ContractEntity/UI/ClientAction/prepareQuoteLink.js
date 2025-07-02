'use strict';

module.exports = function prepareQuoteLink(input) {

    const document = input?.data?.quote;
    const entity = "Contract";

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: document?.entity ?? entity,
                configurationCodeName: document?.originalConfigurationCodeName,
                version: document?.originalConfigurationVersion,
                documentNumber: document?.number
            }
        }
    };
};
