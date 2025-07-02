'use static';

module.exports = function mapping(input, sinkExchange) {

    sinkExchange.softwareVersion = input.softwareVersion;

    const output = {
        input: {
            data: {
                criteria: {
                    accountingCertificateNumbers: input.itemNumbers
                }
            }
        }
    };

    return output;
};
