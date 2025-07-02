'use static';

module.exports = function mapping(input, sinkExchange) {

    if (!sinkExchange.isCorrectionCreation || sinkExchange.error) {
        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    accountingCertificateNumber: input.accountingCertificateNumber
                }
            }
        }
    };
};
