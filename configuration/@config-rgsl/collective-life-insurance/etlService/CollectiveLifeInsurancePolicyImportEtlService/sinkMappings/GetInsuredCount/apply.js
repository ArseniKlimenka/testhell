'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const insuredCount = sinkResult.data[0].resultData.insuredCount;
    sinkExchange.insuredCount = insuredCount;
};
