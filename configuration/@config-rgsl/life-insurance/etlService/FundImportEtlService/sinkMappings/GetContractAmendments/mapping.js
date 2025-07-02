'use strict';

module.exports = function mapping(input, sinkExchange) {

    const contractId = sinkExchange.contractId;
    if (!contractId) {
        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    contractId
                }
            }
        }
    };
};
