'use strict';

module.exports = function preparePolicyLink(input) {

    const document = input?.data?.policy;
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
