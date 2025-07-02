module.exports = function linkToContractOverview(input) {
    const searchData = input.data.resultData;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: "Contract",
                configurationCodeName: searchData.configurationName,
                version: "1",
                documentNumber: searchData.referenceNo
            }
        }
    };
};
