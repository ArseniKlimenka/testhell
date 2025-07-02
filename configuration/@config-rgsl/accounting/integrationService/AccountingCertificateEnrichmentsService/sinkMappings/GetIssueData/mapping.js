'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    if (!input.isContractEnrichOnly && !sinkExchange.isDuplicate) {

        const partyCode = this.environmentVariables['rgsl.accountingCertificate.partyCode'];
        return {
            input: {
                data: {
                    criteria: {
                        partyCode: partyCode,
                    }
                }
            }
        };
    }
};
