'use strict';

module.exports = function fetchMapping(input, sinkExchange) {

    sinkExchange.mapContext('paymentOrderNumber', input.paymentOrderNumber);

    return {
        input: {
            data: {
                criteria: {
                    paymentOrderNumber: input.paymentOrderNumber
                }
            }
        }
    };
};
