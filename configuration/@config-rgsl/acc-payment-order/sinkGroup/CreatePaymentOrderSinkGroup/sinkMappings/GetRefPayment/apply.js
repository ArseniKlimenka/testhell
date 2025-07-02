'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult.data && sinkResult.data[0] && sinkResult.data[0].resultData) {

        sinkExchange.paymentData = sinkResult.data[0].resultData;
    }
};
