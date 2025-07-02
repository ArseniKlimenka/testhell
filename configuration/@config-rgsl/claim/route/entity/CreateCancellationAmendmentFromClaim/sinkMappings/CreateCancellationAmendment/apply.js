'use strict';

const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    sinkExchange.amendmentNumber = sinkResult.number;
    sinkExchange.amendmentConfName = sinkResult.configurationCodeName;
    sinkExchange.totalAmount = amendmentUtils.calculateTotalCancellationAmount(sinkResult.body)?.total ?? 0;
};
