'use strict';

module.exports = function resultMapping(input) {

    const aaCommission = getDataSourceResult(input, 'GetPolicyAaCommissionDataSource');
    const item = input.resultData;
    const actualCommRate = aaCommission.find(_ => _.dueDate === item.dueDate)?.rate ?? 0;

    return {
        insuredFullName: item.insuredFullName,
        riskName: item.riskName,
        insuranceYear: item.insuranceYear,
        dueDate: item.dueDate,
        usedCommRate: item.commRate,
        actualCommRate: item.commRate === actualCommRate ? undefined : actualCommRate,
    };
};

function getDataSourceResult(input, dataSourceName) {
    return input.additionalDataSources.find(_ => _.dataSourceName === dataSourceName).response.data.map(_ => _.resultData);
}
