module.exports = function linkToRsdOverview(input) {
    const searchData = input.data.resultData;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: 'UniversalDocument',
                configurationCodeName: 'RSD',
                version: '1',
                documentNumber: searchData.rsdNumber,
            }
        }
    };
};
