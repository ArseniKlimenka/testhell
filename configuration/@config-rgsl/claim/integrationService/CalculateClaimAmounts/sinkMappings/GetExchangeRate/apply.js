'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.currentExchangeRate = sinkResult.ExchangeRate;
};
