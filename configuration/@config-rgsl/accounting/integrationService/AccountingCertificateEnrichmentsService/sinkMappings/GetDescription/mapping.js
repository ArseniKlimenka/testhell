'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    sinkExchange.currentCertificateNumber = input.currentCertificateNumber;
    const code = sinkExchange.body?.typeOfRequest.code;
    const codeName = input.configurationCodeName;

    if (codeName) {

        return {
            input: {
                data: {
                    criteria: {
                        code,
                        codeName
                    }
                }
            }
        };
    }
};
