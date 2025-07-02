module.exports = function DataSourceInputMapping(input) {
    const criteria = input?.data?.criteria;
    if (!criteria) {
        throw "Input criteria was not defined!";
    }

    const output = {
        request: {
            dataSourceName: 'CommRulesImportDataLoader',
            request: {
                fileId: criteria.fileId
            },
            additionalDataSources: [
                {
                    dataSourceName: 'ProductsDataSource',
                    request: {
                        criteria: {
                        }
                    }
                },
                {
                    dataSourceName: 'GetAllCurrenciesDataSource',
                    request: {
                        criteria: {
                        }
                    }
                },
                {
                    dataSourceName: 'CreditProgramsDataSource',
                    request: {
                        criteria: {
                        }
                    }
                },
                {
                    dataSourceName: 'PaymentFrequencyDataSource',
                    request: {
                        criteria: {
                        }
                    }
                }
            ],
        }
    };

    return output;
};
