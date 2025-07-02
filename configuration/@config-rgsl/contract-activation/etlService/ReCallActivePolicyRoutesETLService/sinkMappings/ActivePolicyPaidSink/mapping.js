'use strict';

module.exports = function mapping(input) {


    if (input.stateName != 'Activated') {

        return null;
    }

    const requestData = {
        entityType: 'Contract',
        executionRoutes: [
            {
                name: 'ActivePolicyPaid'
            }
        ],
        businessIdentifier: input.contractNumber,
        eventType: 'StatusChanged',
        documentStateNew: 'Activated',
        configurationName: input.configurationName,
        configurationVersion: '1'
    };

    return {
        input: requestData,
    };
};
