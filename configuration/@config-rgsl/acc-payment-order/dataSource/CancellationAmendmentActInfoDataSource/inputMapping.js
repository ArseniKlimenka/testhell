module.exports = function DataSourceInputMapping(input) {
    const criteria = input?.data?.criteria;

    if (!criteria) {

        throw "Input criteria was not defined!";
    }

    const output = {
        request: {
            dataSourceName: 'ContractMainRiskCodeDataSource',
            request: {
                criteria: {
                    contractNumber: criteria.documentNumber
                }
            },
            additionalDataSources: [
                {
                    dataSourceName: 'CancellationAmendmentStateHistoryDataSource',
                    request: {
                        criteria: {
                            documentNumber: criteria.cancellationNumber
                        }
                    }
                },
                {
                    dataSourceName: 'CancellationInquiriesFullDataSource',
                    request: {
                        criteria: {
                            cancellationNumber: criteria.cancellationNumber
                        }
                    }
                }
            ]
        }
    };

    return output;
};
