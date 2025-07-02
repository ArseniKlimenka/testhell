'use strict';

module.exports = function mapping({input, sinkExchange, additionalDataSources}) {

    return {
        contractData: sinkExchange.contractData,
        amendmentData: sinkExchange.amendmentData,
        previousPayments: sinkExchange.previousPayments
    };
};
