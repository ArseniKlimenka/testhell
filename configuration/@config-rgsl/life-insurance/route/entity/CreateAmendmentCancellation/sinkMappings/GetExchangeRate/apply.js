'use strict';

const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.exchangeRate = sinkResult.ExchangeRate;
};
