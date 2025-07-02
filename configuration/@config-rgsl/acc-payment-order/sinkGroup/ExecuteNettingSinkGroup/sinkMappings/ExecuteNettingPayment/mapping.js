'use strict';

module.exports = function mapping(input, sinkExchange) {

    sinkExchange.mapContext('paymentOrderNumber', input.paymentOrderNumber);

    return {
        request: {
            PaymentOrderNo: input.paymentOrderNumber
        }
    };
};
