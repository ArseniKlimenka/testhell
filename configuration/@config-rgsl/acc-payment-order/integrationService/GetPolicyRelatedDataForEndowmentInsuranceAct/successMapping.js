'use strict';

module.exports = function mapping({input, sinkExchange, additionalDataSources}) {

    return {
        contractData: sinkExchange.contractData,
        endowmentData: sinkExchange.endowmentData,
        previousPayments: sinkExchange.previousPayments
    };
};
