'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.paymentOrderNumber = input.PAYMENT_ORDER_NUMBER;
    output.body = JSON.parse(input.BODY);
    output.commonBody = JSON.parse(input.COMMON_BODY);

    return output;
};
