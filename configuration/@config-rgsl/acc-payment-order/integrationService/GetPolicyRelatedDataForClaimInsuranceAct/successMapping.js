'use strict';

module.exports = function mapping({input, sinkExchange, additionalDataSources}) {

    return {
        contractData: sinkExchange.contractData,
        claimData: sinkExchange.claimData,
        previousPayments: sinkExchange.previousPayments
    };
};
