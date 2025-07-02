"use strict";

module.exports = function mapping(input) {

    const requestData = {
        entityType: "Contract",
        executionRoutes: [
            {
                name: "SpmPolicyVersionActivated"
            }
        ],
        businessIdentifier: input.contractNumber,
        eventType: "StatusChanged",
        documentStateNew: "Active",
        configurationName: input.configurationName,
        configurationVersion: "1"
    };

    const output = {
        payload: requestData
    };

    return output;
};
