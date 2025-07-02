'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    const allocations = sinkResult.data.map(i => (i.resultData));
    sinkExchange.mapContext('allocations', allocations);
};
