'use static';

module.exports = function mapping(input, sinkExchange) {

    if (!sinkExchange.isCorrectionCreation) {
        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    origDocNumber: input.accountingCertificateNumber
                }
            }
        }
    };
};
