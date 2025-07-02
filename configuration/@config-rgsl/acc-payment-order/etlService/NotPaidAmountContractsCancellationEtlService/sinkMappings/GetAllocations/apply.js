'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const allocations = sinkResult.data.map(_ => _.resultData);
    sinkExchange.mapContext('allocations', allocations);
};
