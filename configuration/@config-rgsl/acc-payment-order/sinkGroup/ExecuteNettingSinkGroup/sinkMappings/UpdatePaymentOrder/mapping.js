"use strict";

module.exports = function mapping(input, sinkExchange) {

    const poBody = sinkExchange.resolveContext('paymentOrderData');
    const poNumber = sinkExchange.resolveContext('paymentOrderNumber');

    if (!poBody) {

        return;
    }

    return {
        body: poBody,
        number: poNumber
    };
};
