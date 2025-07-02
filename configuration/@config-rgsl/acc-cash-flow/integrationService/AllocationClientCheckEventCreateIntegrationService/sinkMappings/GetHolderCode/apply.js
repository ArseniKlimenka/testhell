'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (!sinkResult?.data || sinkResult?.data.length == 0) {

        return;
    }

    sinkExchange.holderCode = sinkResult.data[0].resultData.holderCode;
};
