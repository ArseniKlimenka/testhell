'use strict';

module.exports = function (sinkResult, sinkInput, sinkExchange) {

    const vatRate = sinkResult.data.vatRate;
    sinkExchange.mapContext('vatRate', vatRate);
};
