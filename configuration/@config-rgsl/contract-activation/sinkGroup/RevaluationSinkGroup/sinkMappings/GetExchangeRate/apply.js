'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    let exchangeRates = sinkExchange.resolveContext('exchangeRates');
    if (!exchangeRates) {
        exchangeRates = {};
        sinkExchange.mapContext('exchangeRates', exchangeRates);
    }

    exchangeRates[sinkInput.request.fromCurrencyCode] = sinkResult.ExchangeRate;
};
