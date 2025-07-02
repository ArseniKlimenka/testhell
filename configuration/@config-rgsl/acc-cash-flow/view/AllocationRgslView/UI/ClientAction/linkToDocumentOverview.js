module.exports = function linkToDocumentOverview(input) {
    const searchData = input.data.resultData;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: searchData.entityType,
                configurationCodeName: searchData.configurationName,
                version: "1",
                documentNumber: searchData.refDocumentNo
            }
        }
    };
};
