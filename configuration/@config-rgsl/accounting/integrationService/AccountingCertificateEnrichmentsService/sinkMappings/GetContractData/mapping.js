'use strict';

const { accCertificateIncomingSource } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    sinkExchange.currentCertificateNumber = input.currentCertificateNumber;
    sinkExchange.body = input.body;
    if (!sinkExchange.body.accountingCertificateIncomeSource) {
        sinkExchange.body.accountingCertificateIncomeSource = input.incomingSource ?? accCertificateIncomingSource.Lkk;
    }

    const contractNumber = input.body.contract.number;

    return {
        input: {
            data: {
                criteria: {
                    contractType: "Policy",
                    number: contractNumber,
                    isStrictNumber: true
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };
};
