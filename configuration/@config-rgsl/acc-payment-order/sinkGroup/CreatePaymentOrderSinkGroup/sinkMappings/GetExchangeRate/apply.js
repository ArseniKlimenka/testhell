'use strict';

const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkExchange.contractData) {

        sinkExchange.contractData.exchangeRate = sinkResult.ExchangeRate;
        sinkExchange.contractData.convertedCancellationAmount = round(sinkResult.Money.Amount);
    }
    else if (sinkExchange.claimData) {

        sinkExchange.claimData.exchangeRate = sinkResult.ExchangeRate;
        sinkExchange.claimData.convertedAmount = round(sinkResult.Money.Amount);
    }
    else if (sinkExchange.endowmentData) {

        sinkExchange.endowmentData.exchangeRate = sinkResult.ExchangeRate;
        sinkExchange.endowmentData.convertedAmount = round(sinkResult.Money.Amount);
    }
};
