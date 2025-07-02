module.exports = function linkToActOverview(input) {
    const searchData = input.data.resultData;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: 'UniversalDocument',
                configurationCodeName: 'CommissionAct',
                version: 1,
                documentNumber: searchData.actNo,
            }
        }
    };
};
