'use strict';

module.exports = function mapping(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    paymentOrderNumber: input.currentPONumber
                }
            }
        }
    };
};
