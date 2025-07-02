'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const allocationsToCancel = sinkResult.data.map(r => r.resultData);
    sinkExchange.mapContext('allocationsToCancel', allocationsToCancel);
};
