'use strict';

module.exports = function mapping(input) {
    const requestData = {
        entityType: 'Contract',
        executionRoutes: [
            {
                name: 'PolicyRoute'
            }
        ],
        businessIdentifier: input.contractNumber,
        eventType: 'Updated',
        configurationName: input.configurationName,
        configurationVersion: '1',
    };

    return {
        input: requestData,
    };
};
