'use strict';

module.exports = function mapping(input, sinkExchange) {

    if (sinkExchange.hasClaims) {

        return null;
    }

    return {
        input: {
            data: {
                criteria: {
                    contractNumber: input.contractNumber,
                    excludeStates: ['Cancelled', 'Reject']
                }
            }
        }
    };
};
