'use strict';
module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    if (!sinkResult || !sinkResult.allocationIds || sinkResult.allocationIds.length == 0) {
        sinkExchange.allocationsForRegistryNotCreated = `Allocations for registry ${sinkExchange.registryNumber} not created.`;
        throw new Error(sinkExchange.allocationsForRegistryNotCreated);
    }
};
