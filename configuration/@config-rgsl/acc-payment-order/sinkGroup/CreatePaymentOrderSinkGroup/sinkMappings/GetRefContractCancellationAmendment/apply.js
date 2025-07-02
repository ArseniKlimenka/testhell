'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const data = sinkResult.data;

    if (!data || data.length === 0) {

        return;
    }

    const amendmentData = sinkResult.data[0].resultData;

    sinkExchange.contractData = amendmentData;
    sinkExchange.contractData.paymentLines = amendmentData.paymentLines ?? [];
};
