'use strict';

module.exports = function mapping(input, sinkExchange) {

    const allocations = sinkExchange.resolveContext('allocations');

    if (!allocations) {

        return;
    }

    return {
        request: {
            allocationIds: allocations.map(_ => _.allocationId),
        }
    };
};
