'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const allocations = sinkResult.data.map(_ => _.resultData);

    sinkExchange.logMessages.push({
        message: `${allocations.lenght} allocations found`,
        logLevel: 'debug'
    });

    const filteredAllocations = allocations.filter(x => x.bsi.isMigrated === false);

    if (filteredAllocations.length === 0) {

        sinkExchange.logMessages.push({
            message: 'Non-migrated allocations not found',
            logLevel: 'debug'
        });

        sinkExchange.isSkippingRoute = true;
    }

    sinkExchange.allocations = filteredAllocations;
};
