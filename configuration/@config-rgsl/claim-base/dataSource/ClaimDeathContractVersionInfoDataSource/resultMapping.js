'use strict';

module.exports = function resultMapping(input) {

    const riskResult = getDataSourceResult(input, 'RisksDataSource');

    const result = {
        versionResult: input.resultData,
        riskResult: riskResult[0]
    };

    return result;
};

function getDataSourceResult(input, dataSourceName) {

    return input.additionalDataSources.find(_ => _.dataSourceName === dataSourceName).response.data.map(_ => _.resultData);
}
