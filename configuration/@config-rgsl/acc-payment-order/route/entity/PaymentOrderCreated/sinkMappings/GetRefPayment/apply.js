'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const bsi = sinkResult.data[0].resultData;
    sinkExchange.mapContext('paymentData', bsi);
};
