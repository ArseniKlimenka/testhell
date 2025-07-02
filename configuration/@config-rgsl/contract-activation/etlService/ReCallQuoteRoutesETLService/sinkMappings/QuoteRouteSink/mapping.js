'use strict';

module.exports = function mapping(input) {

    const requestData = {
        entityType: 'Contract',
        executionRoutes: [
            {
                name: 'QuoteRoute'
            }
        ],
        businessIdentifier: input.contractNumber,
        eventType: 'Created',
        configurationName: input.configurationName,
        configurationVersion: '1'
    };


    return {
        input: requestData,
    };
};
