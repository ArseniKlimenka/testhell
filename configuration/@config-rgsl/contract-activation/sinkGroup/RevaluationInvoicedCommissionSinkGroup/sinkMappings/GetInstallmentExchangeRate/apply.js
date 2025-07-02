'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    let dueDateExchangeRates = sinkExchange.resolveContext('dueDateExchangeRates');
    if (!dueDateExchangeRates) {
        dueDateExchangeRates = {};
        sinkExchange.mapContext('dueDateExchangeRates', dueDateExchangeRates);
    }

    let dueDateExchangeRate = dueDateExchangeRates[sinkInput.request.fromCurrencyCode];
    if (!dueDateExchangeRate) {
        dueDateExchangeRates[sinkInput.request.fromCurrencyCode] = dueDateExchangeRate = {};
    }
    dueDateExchangeRate[sinkInput.request.atDate] = sinkResult.ExchangeRate;
};
