'use strict';

module.exports = function mapping(input) {

    const requestData = {
        entityType: 'Contract',
        executionRoutes: [
            {
                name: 'PolicyActivated'
            }
        ],
        businessIdentifier: input.contractNumber,
        eventType: 'StatusChanged',
        documentStateNew: 'Active',
        configurationName: input.configurationName,
        configurationVersion: '1'
    };

    return {
        input: requestData,
    };
};
