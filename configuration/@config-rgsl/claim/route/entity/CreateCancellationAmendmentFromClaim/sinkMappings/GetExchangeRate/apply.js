'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    sinkExchange.exchangeRate = sinkResult.ExchangeRate;
};
