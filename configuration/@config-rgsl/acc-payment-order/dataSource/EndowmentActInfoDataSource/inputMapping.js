module.exports = function DataSourceInputMapping(input) {
    const criteria = input?.data?.criteria;

    if (!criteria) {

        throw "Input criteria was not defined!";
    }

    const output = {
        request: {
            dataSourceName: 'EndowmentInfoDataSource',
            request: {
                criteria: {
                    documentNumber: criteria.documentNumber,
                    beneficiaryCode: criteria.beneficiaryCode
                }
            },
            additionalDataSources: [
                {
                    dataSourceName: 'EndowmentStateHistoryDataSource',
                    request: {
                        criteria: {
                            documentNumber: criteria.documentNumber
                        }
                    }
                },
                {
                    dataSourceName: 'EndowmentInquiriesFullDataSource',
                    request: {
                        criteria: {
                            endowmentNumber: criteria.documentNumber
                        }
                    }
                }
            ],
        }
    };

    return output;
};
