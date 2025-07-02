'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const rsdAllocations = sinkResult.data.map(_ => _.resultData);
    sinkExchange.mapContext('rsdAllocations', rsdAllocations);
};
