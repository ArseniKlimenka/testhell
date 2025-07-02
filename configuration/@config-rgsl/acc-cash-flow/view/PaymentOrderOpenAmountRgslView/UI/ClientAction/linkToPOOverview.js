module.exports = function linkToPOOverview(input) {
    const searchData = input.data.resultData;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: "PaymentOrder",
                configurationCodeName: searchData.configurationName,
                version: "1",
                documentNumber: searchData.documentNo
            }
        }
    };
};
