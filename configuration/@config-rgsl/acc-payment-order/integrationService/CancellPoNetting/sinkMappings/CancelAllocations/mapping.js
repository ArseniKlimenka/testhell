'use strict';

module.exports = function mapping(integrationServiceInput, sinkExchange) {

    const result = sinkExchange.paymentData;
    let allocationIds = [];

    result.forEach(item => {

        const idS = item.allocationsInfo.map(i => i.allocationId);
        allocationIds = allocationIds.concat(idS);
    });

    if (allocationIds.length > 0) {

        return {
            request: {
                AllocationIds: allocationIds
            }
        };
    }
};
