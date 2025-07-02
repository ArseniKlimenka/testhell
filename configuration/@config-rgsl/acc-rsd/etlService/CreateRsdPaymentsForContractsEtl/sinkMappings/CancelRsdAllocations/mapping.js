'use strict';

module.exports = function mapping(input, sinkExchange) {

    const rsdAllocations = sinkExchange.resolveContext('rsdAllocations');
    if (!rsdAllocations || rsdAllocations.length === 0) {
        return;
    }

    return {
        request: {
            allocationIds: rsdAllocations.map(_ => _.allocationId),
        }
    };
};
