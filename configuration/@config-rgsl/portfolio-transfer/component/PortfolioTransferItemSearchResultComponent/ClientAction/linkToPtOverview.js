module.exports = function linkToPtOverview(input) {

    const searchData = input.data.resultData;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: 'UniversalDocument',
                configurationCodeName: 'PortfolioTransfer',
                version: 1,
                documentNumber: searchData.documentNo,
            }
        }
    };
};
