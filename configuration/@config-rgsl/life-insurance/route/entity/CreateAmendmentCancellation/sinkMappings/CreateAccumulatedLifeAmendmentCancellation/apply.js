"use strict";

const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.createdAmendmentNumber = sinkResult.number;
    sinkExchange.createdAmendmentConfigurationCodeName = sinkResult.configurationCodeName;
    sinkExchange.createdAmendmentBody = sinkResult.body;
    sinkExchange.totalAmount = amendmentUtils.calculateTotalCancellationAmount(sinkResult.body)?.total ?? 0;
};
