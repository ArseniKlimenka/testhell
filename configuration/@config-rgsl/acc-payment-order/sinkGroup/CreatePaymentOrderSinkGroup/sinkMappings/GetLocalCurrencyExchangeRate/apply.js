'use strict';

const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    sinkExchange.endowmentData.localExchangeRate = sinkResult.ExchangeRate;
    sinkExchange.endowmentData.localConvertedAmount = round(sinkResult.Money.Amount);
};
