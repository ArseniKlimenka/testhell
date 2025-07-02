'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    let exchangeRates = sinkExchange.resolveContext('exchangeRates');
    if (!exchangeRates) {
        exchangeRates = [];
        sinkExchange.mapContext('exchangeRates', exchangeRates);
    }

    exchangeRates.push(({
        currencyCodeFrom: sinkInput.request.fromCurrencyCode,
        currencyCodeTo: sinkInput.request.toCurrencyCode,
        date: sinkInput.request.atDate,
        exchangeRate: sinkResult.ExchangeRate,
    }));
};
