'use strict';

module.exports = function mapping(input, sinkExchange) {

    if (!sinkExchange.shouldCancelAllocations) {

        return;
    }

    return {
        request: {
            ReferenceNumber: input.claimNumber,
            ReferenceConfName: "Claim"
        }
    };
};
