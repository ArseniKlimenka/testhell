module.exports = function linkToContractOverview(input) {
    const searchData = input.data.resultData;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: 'Contract',
                configurationCodeName: searchData.contractConfigurationName,
                version: searchData.contractConfigurationVersion,
                documentNumber: searchData.contractNumber
            }
        }
    };
};
