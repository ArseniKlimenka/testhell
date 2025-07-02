'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const failedCount = sinkResult.data.length;
    sinkExchange.mapContext('failedCount', failedCount);
};
