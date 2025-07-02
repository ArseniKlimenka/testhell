'use static';

const { accCertificateIncomingSource } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input, sinkExchange) {

    if (input.body.accountingCertificateIncomeSource === accCertificateIncomingSource.Import) {
        return {
            businessNumber: input.number,
            transition: {
                configurationName: "AccountingCertificate",
                transitionName: "Draft_to_Checked"
            }
        };
    }
};
