module.exports = function linkToContractOverview(input) {
    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: "Contract",
                configurationCodeName: input.context.Body.configurationName,
                version: "1",
                documentNumber: input.context.Body.createdPolicyNumber
            }
        }
    };
};
