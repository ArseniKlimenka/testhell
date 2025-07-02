module.exports = function DataSourceInputMapping(input) {
    const criteria = input?.data?.criteria;
    if (!criteria) {
        throw "Input criteria was not defined!";
    }

    const output = {
        request: {
            dataSourceName: 'GetInvoicedCommissionDataSource',
            request: {
                criteria: {
                    contractNumber: criteria.contractNumber,
                }
            },
            additionalDataSources: [
                {
                    dataSourceName: 'GetPolicyAaCommissionDataSource',
                    request: {
                        criteria: {
                            contractNumbers: [criteria.contractNumber],
                        }
                    }
                },
            ],
        }
    };

    return output;
};
