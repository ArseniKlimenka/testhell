module.exports = function linkToDocumentOverview(input) {
    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: 'UniversalVersionedDocument',
                configurationCodeName: 'ProductConfiguration',
                version: "1",
                documentNumber: input.data.resultData.documentNumber
            }
        }
    };
};
