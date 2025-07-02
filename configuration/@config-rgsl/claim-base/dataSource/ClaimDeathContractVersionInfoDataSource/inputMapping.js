module.exports = function DataSourceInputMapping(input) {

    const criteria = input?.data?.criteria;

    if (!criteria) {

        throw "Input criteria was not defined!";
    }

    const output = {
        request: {
            dataSourceName: 'ContractVersionInfoDataSource',
            request: {
                criteria: {
                    contractNumber: criteria.contractNumber
                }
            },
            additionalDataSources: [
                {
                    dataSourceName: 'RisksDataSource',
                    request: {
                        criteria: {
                            code: criteria.riskCode,
                            riskGroup: 'Death'
                        }
                    }
                }
            ],
        }
    };

    return output;
};
