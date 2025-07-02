'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult && sinkResult.data && sinkResult.data[0] &&
        sinkResult.data[0].resultData && sinkResult.data[0].resultData.body) {
        sinkExchange.requestData = sinkResult.data[0].resultData;
    }

};
