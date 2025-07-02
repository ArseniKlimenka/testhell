'use static';

const { states } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function mapping(input, sinkExchange, number, data) {

    if (input.accountingCertificateState !== states.Checked) {
        return;
    }

    return {
        businessNumber: input.accountingCertificateNumber,
        transition: {
            configurationName: input.accountingCertificateConfigurationName,
            transitionName: 'Checked_to_Issued',
        }
    };
};
